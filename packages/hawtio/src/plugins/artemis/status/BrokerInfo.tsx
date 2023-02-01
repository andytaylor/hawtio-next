import React, { useEffect, useState } from 'react'
import { Tile, Button, Checkbox, DataListItemCells, DataListCell, DataListAction, DataListItemRow, DataListItem, DataListContent, DataListToggle } from '@patternfly/react-core';
import { ChartDonutUtilization } from '@patternfly/react-charts';
import { TableComposable, Tr, Tbody, Td } from '@patternfly/react-table';
import { connectService } from '@hawtio/plugins/connect/connect-service'
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { BrokerDetails, BrokerStatus, statusService } from './status-service';
import { log } from '../globals'
import Jolokia, { IJolokia } from 'jolokia.js';
import { Artemis } from '../Artemis';
import exp from 'constants';
import { ArtemisTabs } from '../ArtemisTabs';
import { artemisService } from '../artemis-service';

export type ConnectionProps = {
  name: string
  scheme: string
  host: string
  port: number
  path: string
}

export const BrokerInfo: React.FunctionComponent<ConnectionProps> = connection => {

  const initialBrokerDetails: BrokerDetails = {
    name: '?',
    version: '',
    brokerMBean: ''
  }

  const initialStatus: BrokerStatus = {
    globalMaxSize: 0,
    addressMemoryUsage: 0,
    used: 0,
    uptime: 'unknown'
  };

  const [brokerDetails, setBrokerDetails] = useState(initialBrokerDetails);
  const [status, setStatus] = useState(initialStatus);
  const [isChecked, setIsChecked] = useState(true);
  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);
  const [connected, setConnected] = useState(false);
  const [expanded, setExpanded] = useState(false);


   useEffect(() => {
      const check = () => {
      var jolokia;
      connectService.testConnection(connection).then(result => {
          if (result.ok) {
            jolokia = statusService.createJolokia(connection);
            if (isDetailsLoaded) {
              loadStatus(jolokia, brokerDetails.brokerMBean)
            } else {
              loadBrokerDetails(jolokia)
            }
            setConnected(true)
          } else {
            setConnected(false)
          }
        })
      }
      check() // initial fire
      //const timer = setInterval(check, 5000) // run every 5 secs
      //return () => clearInterval(timer) //cancel the timer when done
    }, [brokerDetails, isDetailsLoaded, expanded])


    const loadBrokerDetails = (jolokia: IJolokia) => {
      jolokia.request(
         {
            type: "read",
            mbean: "org.apache.activemq.artemis:broker=*",
            attribute: "Name"
         },
         {
            success: function(response) {
                var responses = response.value
                var brokerMBeanName = Object.keys(responses as Object)[0];
                var name = Object.values(responses as Object)[0].Name
                var version = jolokia.getAttribute(brokerMBeanName, "Version") as string;
                if (version) {
                var brokerDetails: BrokerDetails = {
                  name: name,
                  version: version,
                  brokerMBean: brokerMBeanName
                }
                setBrokerDetails(brokerDetails)
                setIsDetailsLoaded(true);
                loadStatus(jolokia, brokerMBeanName)
              }
            }
         }
      );
   }

  const handleChange = (checked: boolean | ((prevState: boolean) => boolean)) => {
    setIsChecked(checked)
  }

  const connect = () => {
    connectService.connect(connection)
  }

  const loadStatus = (jolokia: IJolokia, brokerMBeanName: string) => {
    var globalMaxSize = jolokia.getAttribute(brokerMBeanName, "GlobalMaxSize"); 
    var addressMemoryUsage = jolokia.getAttribute(brokerMBeanName, "AddressMemoryUsage");
    var uptime = jolokia.getAttribute(brokerMBeanName, "Uptime");
    var status = statusService.loadStatus(globalMaxSize as number, addressMemoryUsage as number, uptime as string);
    setStatus(status)
  }

  const toggle = () => {
    log.info("expanded " + expanded)
    setExpanded(!expanded);
  };

  const chart = (
    <ChartDonutUtilization
    ariaDesc="Storage capacity"
    ariaTitle="Address Memory utilization chart"
    constrainToVisibleArea
    data={{ x: 'GBps capacity', y: status.used }}
    labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
    legendData={[{ name: `Address Memory: ${' '}${status.addressMemoryUsage.toFixed(2)}MB`}]}
    legendOrientation="vertical"legendPosition="bottom"
    name="chart4"
    padding={{
      bottom: 75, // Adjusted to accommodate legend
      left: 20,
      right: 20,
      top: 20
    }}
    subTitle={`${status.globalMaxSize}MB`}
    title={`${status.used.toFixed(0)}%`}
    thresholds={[{ value: 60 }, { value: 90 }]}
    width={435}
  />
  )

  const brokerData = (
    <TableComposable aria-label="Simple table"  variant='compact'>
      <Tbody>
        <Tr>
          <Td>version</Td>
          <Td>uptime</Td>
        </Tr>
        <Tr>
          <Td>{brokerDetails.version}</Td>
          <Td>{status.uptime}</Td>
        </Tr>
      </Tbody>
    </TableComposable>
  )

  return (
    <React.Fragment>

      <DataListItem key={`connection-item-${connection.name}`} aria-labelledby={`connection ${connection.name}`}> 

        <DataListItemRow>
        <DataListToggle
            onClick={() => toggle()}
            isExpanded={expanded}
            id="m-ex-toggle1"
            aria-controls="m-ex-expand1"
          />
          <DataListContent aria-label={''}>
            {chart}
          </DataListContent>

          <DataListContent aria-label={''}>
            {brokerData}
          </DataListContent>
          <DataListAction
            id={`connection-actions-${connection.name}`} 
            aria-label={`connection actions ${connection.name}`}
            aria-labelledby={`${name} connection-actions-${connection.name}`}
          >
            <Button
              key={`connection-action-connect-${connection.name}`}
              variant="primary"
              onClick={connect}
              isDisabled={!true}
              isSmall
            >
              Connect
            </Button> 
            
          </DataListAction> 
        </DataListItemRow>
      </DataListItem>
  </React.Fragment>       
  )
}
