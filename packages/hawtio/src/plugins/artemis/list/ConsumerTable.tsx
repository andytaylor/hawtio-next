import React, { useEffect } from 'react'
import {
  Button
} from '@patternfly/react-core';
import { Broker } from '../Artemis.js';
import { ActiveSort, ArtemisTable, Column, Filter } from './ArtemisTable';
import { log } from '../globals.js';
import { artemisService } from '../artemis-service.js';

export const ConsumerTable: React.FunctionComponent<Broker> = broker => {
    const allColumns: Column[] = [
      {id: 'id', name: 'ID', visible: true, sortable: true, filterable: true},
      {id: 'session', name: 'Session', visible: true, sortable: true, filterable: true},
      {id: 'clientID', name: 'Client ID', visible: true, sortable: true, filterable: true},
      {id: 'validatedUser', name: 'Validated User', visible: true, sortable: true, filterable: true},
      {id: 'protocol', name: 'Protocol', visible: true, sortable: true, filterable: false},
      {id: 'queueName', name: 'Queue', visible: true, sortable: true, filterable: true},
      {id: 'queueType', name: 'Queue Type', visible: true, sortable: true, filterable: false},
      {id: 'filter', name: 'Filter', visible: true, sortable: true, filterable: false},
      {id: 'addressName', name: 'Address', visible: true, sortable: true, filterable: true},
      {id: 'remoteAddress', name: 'Remote Address', visible: true, sortable: true, filterable: true},
      {id: 'localAddress', name: 'Local Address', visible: true, sortable: true, filterable: true},
      {id: 'creationTime', name: 'Creation Time', visible: true, sortable: true, filterable: false},
      {id: 'messagesInTransit', name: 'Messages in Transit', visible: false, sortable: true, filterable: true},
      {id: 'messagesInTransitSize', name: 'Messages in Transit Size', visible: false, sortable: true, filterable: true},
      {id: 'messagesDelivered', name: 'Messages Delivered', visible: false, sortable: true, filterable: true},
      {id: 'messagesDeliveredSize', name: 'Messages Delivered Size', visible: false, sortable: true, filterable: true},
      {id: 'messagesAcknowledged', name: 'Messages Acknowledged', visible: false, sortable: true, filterable: true},
      {id: 'messagesAcknowledgedAwaitingCommit', name: 'Messages Acknowledged awaiting Commit', visible: false, sortable: true, filterable: true},
      {id: 'lastDeliveredTime', name: 'Last Delivered Time', visible: false, sortable: true, filterable: false},
      {id: 'lastAcknowledgedTime', name: 'Last Acknowledged Time', visible: false, sortable: true, filterable: false},
      ];

      const listConsumers = async ( page: number, perPage: number, activeSort: ActiveSort, filter: Filter):Promise<any> => {
        const response = await artemisService.getConsumers(broker.jolokia, broker.brokerMBeanName, page, perPage, activeSort, filter);
        const data = JSON.parse(response);
        return data;
      }
      
    return <ArtemisTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia} allColumns={allColumns} getData={listConsumers}/>
}