import React, { useEffect, useState } from 'react'
import { GridItem, Grid, Toolbar, ToolbarContent, ToolbarItem, Select, SelectOptionObject, SelectOption, SelectVariant, EmptyState, Title, EmptyStateVariant, EmptyStateIcon, EmptyStateBody } from '@patternfly/react-core';
import { artemisService } from './artemis-service';
import { IJolokia } from 'jolokia.js';
import { useConnections } from '../connect/context';
import { statusService } from './status/status-service';
import { ProducerTable } from './list/ProducerTable';
import PluggedIcon from '@patternfly/react-icons/dist/esm/icons/plugged-icon';
import { ConsumerTable } from './list/ConsumerTable';
import { ConnectionsTable } from './list/ConnectionsTable';
import { SessionsTable } from './list/SessionsTable';
import { AddressesTable } from './list/AddressesTable';
import { QueuesTable } from './list/QueuesTable';


export type Broker = {
  brokerMBeanName: string,
  loaded: boolean,
  jolokia: IJolokia
}

export const Artemis: React.FunctionComponent = () => {

  const { connections } = useConnections()
  const [broker, setBroker] = useState<Broker>();
  //drop downs in toolbar 
  const viewOptions = [
    { value: 'Connections' },
    { value: 'Sessions' },
    { value: 'Producers' },
    { value: 'Consumers' },
    { value: 'Addresses' },
    { value: 'Queues' }
  ];
  const [brokerIsExpanded, setBrokerIsExpanded] = useState(false);
  const [viewOptionsIsExpanded, setViewOptionsExpanded] = useState(false);
  var name = Object.keys(connections as Object)[0]
  const [brokerSelected, setBrokerSelected] = useState(name)
  const [viewOptionsSelected, setViewOptionsSelected] = useState(viewOptions[0].value)


  const onBrokerToggle = (isExpanded: boolean) => {
    setBrokerIsExpanded(isExpanded);
  };

  const onViewOptionsToggle = (isExpanded: boolean) => {
    setViewOptionsExpanded(isExpanded);
  };

  const onBrokerSelect = (
    _event: React.MouseEvent | React.ChangeEvent,
    selection: string | SelectOptionObject,
    isPlaceholder: boolean | undefined
  ) => {
    setBrokerSelected(selection as string);
    setBrokerIsExpanded(false);
  };
  
  const onViewOptionsSelect = (
    _event: React.MouseEvent | React.ChangeEvent,
    selection: string | SelectOptionObject,
    isPlaceholder: boolean | undefined
  ) => {
    setViewOptionsSelected(selection as string);
    setViewOptionsExpanded(false);
  };


  const producerContent = broker ? <ProducerTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/> : '';


  useEffect(() => {
    const readAttributes = async () => {
        const jolokia = statusService.createJolokia(connections[brokerSelected]);
        const attrs = await artemisService.getBrokerMBean(jolokia);
        var brokerMBeanName = Object.keys(attrs as Object)[0];
        setBroker({brokerMBeanName: brokerMBeanName, loaded: true, jolokia: jolokia});
      }
      
    readAttributes();
    }, [brokerSelected])



  return (
    <Grid hasGutter>
    <GridItem span={10}>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem><ToolbarContent><b>Broker: </b></ToolbarContent></ToolbarItem>
          <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onBrokerToggle}
            onSelect={onBrokerSelect}
            selections={brokerSelected}
            isOpen={brokerIsExpanded}
          >
            {Object.entries(connections).map(([name, connection]) => (
                <SelectOption key={connection.name} value={connection.name} />
             ))}
          </Select>
          </ToolbarItem>
          
          <ToolbarItem><ToolbarContent><b>View: </b></ToolbarContent></ToolbarItem>
          <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onViewOptionsToggle}
            onSelect={onViewOptionsSelect}
            selections={viewOptionsSelected}
            isOpen={viewOptionsIsExpanded}
          >
            {viewOptions.map((option, index) => (
            <SelectOption
              key={index}
              value={option.value}
            />
          ))}
          </Select>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </GridItem>
    <GridItem span={10}>
    {(() => {
        if (broker) {
          switch(viewOptionsSelected) {
            case 'Connections' :
              return <ConnectionsTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
            case 'Sessions' :
                return <SessionsTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
            case 'Producers' :
              return <ProducerTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
            case 'Consumers' :
              return <ConsumerTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
            case 'Addresses' :
              return <AddressesTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
            case 'Queues' :
              return <QueuesTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia}/>
          }
        }
        return  <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={PluggedIcon} />
                  <Title headingLevel="h4" size="lg">Jolokia Endpoint Unavailable</Title>
                  <EmptyStateBody>
                    Please check the Broker's Jolokia endpoint is available
                  </EmptyStateBody>
                </EmptyState>
    })()}
    </GridItem>
  </Grid>
  )
}
