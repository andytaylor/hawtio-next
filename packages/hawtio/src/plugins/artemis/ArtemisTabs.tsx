import React, { useEffect, useState } from 'react'
import { Tabs, Tab, TabTitleText, Checkbox, Tooltip } from '@patternfly/react-core';
import { Connections } from './list/ArtemisTable'
import { log } from './globals'
import { artemisService } from './artemis-service';
import { AttributeValues, IJolokiaService } from '../connect/jolokia-service';
import { boolean } from 'superstruct';
import { Broker } from './Artemis';



export const ArtemisTabs: React.FunctionComponent<Broker> = broker => {

  useEffect(() => {
    log.info("BBBBBBBBB")
  }, [broker])

    const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

    // Toggle currently active primary tab
    const handleTabClick = (
      event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
      tabIndex: string | number
    ) => {
      setActiveTabKey(tabIndex);
    };


  return (
     <div style={{ marginTop: '10px' }}>
        <Tabs
          aria-label="secondary tabs for users"    
          role="region"
          activeKey={activeTabKey}
          isSecondary
          onSelect={handleTabClick}
        >
          <Tab eventKey={1} title={<TabTitleText>Connections</TabTitleText>}>
            <Connections brokerMBeanName={broker.brokerMBeanName} loaded={broker.loaded} jolokia={broker.jolokia}/>
          </Tab>
          <Tab eventKey={2} title={<TabTitleText>Sessions</TabTitleText>}>
            Sessions
          </Tab>
          <Tab eventKey={3} title={<TabTitleText>Addresses</TabTitleText>}>
            Addresses
          </Tab>
          <Tab eventKey={4} title={<TabTitleText>Queues</TabTitleText>}>
            Queues
          </Tab>
          <Tab eventKey={5} title={<TabTitleText>Producers</TabTitleText>}>
            Producers
          </Tab>
          <Tab eventKey={6} title={<TabTitleText>Consumers</TabTitleText>}>
            Consumers
          </Tab>
        </Tabs>
     </div>
  )
}
