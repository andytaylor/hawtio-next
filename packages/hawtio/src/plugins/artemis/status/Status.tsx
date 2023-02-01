import React, { useEffect, useState } from 'react'
import { BrokerInfo } from './BrokerInfo'
import { log } from '../globals'
import { useConnections } from '@hawtio/plugins/connect/context'
import { DataList, DataListCell, DataListItem, DataListItemCells, DataListItemRow } from '@patternfly/react-core'

export const Status: React.FunctionComponent = () => {

  const { connections } = useConnections()

  useEffect(() => {
    log.info("rendered status")  
  })

  

  return (

    <React.Fragment>
      <DataList id="connection-list" aria-label="connection list" isCompact>
        {Object.entries(connections).map(([name, connection]) => (
            <BrokerInfo name={connection.name}
            scheme="http"
            host={connection.host}
            port={connection.port}
            path="/console/jolokia"/>
        ))}
      </DataList>
    </React.Fragment>
  )
}
