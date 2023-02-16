import React, { } from 'react'
import { Broker } from '../Artemis.js';
import { ActiveSort, ArtemisTable, Column, Filter } from './ArtemisTable';
import { artemisService } from '../artemis-service.js';

export const QueuesTable: React.FunctionComponent<Broker> = broker => {
    const allColumns: Column[] = [
        {id: 'id', name: 'ID', visible: true, sortable: true, filterable: true},
        {id: 'name', name: 'Name', visible: true, sortable: true, filterable: true},
        {id: 'address', name: 'Address', visible: true, sortable: true, filterable: true},
        {id: 'routingType', name: 'Routing Type', visible: true, sortable: true, filterable: true},
        {id: 'filter', name: 'Filter', visible: true, sortable: true, filterable: true},
        {id: 'durable', name: 'Durable', visible: true, sortable: true, filterable: true},
        {id: 'maxConsumers', name: 'Max Consumers', visible: true, sortable: true, filterable: true},
        {id: 'purgeOnNoConsumers', name: 'Purge On No Consumers', visible: true, sortable: true, filterable: true},
        {id: 'consumerCount', name: 'Consumer Count', visible: true, sortable: true, filterable: true},
        {id: 'messageCount', name: 'Message Count', visible: false, sortable: true, filterable: true},
        {id: 'paused', name: 'Paused', visible: false, sortable: true, filterable: true},
        {id: 'temporary', name: 'Temporary', visible: false, sortable: true, filterable: true},
        {id: 'autoCreated', name: 'Auto Created', visible: false, sortable: true, filterable: true},
        {id: 'user', name: 'User', visible: false, sortable: true, filterable: true},
        {id: 'messagesAdded', name: 'Total Messages Added', visible: false, sortable: true, filterable: true},
        {id: 'messagesAcked', name: 'Total Messages Acked', visible: false, sortable: true, filterable: true},
        {id: 'deliveringCount', name: 'Delivering Count', visible: false, sortable: true, filterable: true},
        {id: 'messagesKilled', name: 'Messages Killed', visible: false, sortable: true, filterable: true},
        {id: 'directDeliver', name: 'Direct Deliver', visible: false, sortable: true, filterable: true},
        {id: 'exclusive', name: 'Exclusive', visible: false, sortable: true, filterable: true},
        {id: 'lastValue', name: 'Last Value', visible: false, sortable: true, filterable: true},
        {id: 'lastValueKey', name: 'Last Value Key', visible: false, sortable: true, filterable: true},
        {id: 'scheduledCount', name: 'Scheduled Count', visible: false, sortable: true, filterable: true},
        {id: 'groupRebalance', name: 'Group Rebalance', visible: false, sortable: true, filterable: true},
        {id: 'groupRebalancePauseDispatch', name: 'Group Rebalance Pause Dispatch', visible: false, sortable: true, filterable: true},
        {id: 'groupBuckets', name: 'Group Buckets', visible: false, sortable: true, filterable: true},
        {id: 'groupFirstKey', name: 'Group First Key', visible: false, sortable: true, filterable: true},
        {id: 'enabled', name: 'Queue Enabled', visible: false, sortable: true, filterable: true},
        {id: 'ringSize', name: 'Ring Size', visible: false, sortable: true, filterable: true},
        {id: 'consumersBeforeDispatch', name: 'Consumers Before Dispatch', visible: false, sortable: true, filterable: true},
        {id: 'delayBeforeDispatch', name: 'Delay Before Dispatch', visible: false, sortable: true, filterable: true},
        {id: 'autoDelete', name: 'Auto Delete', visible: false, sortable: true, filterable: true}
      ];

      const listQueues = async ( page: number, perPage: number, activeSort: ActiveSort, filter: Filter):Promise<any> => {
        const response = await artemisService.getQueues(broker.jolokia, broker.brokerMBeanName, page, perPage, activeSort, filter);
        const data = JSON.parse(response);
        return data;
      }
      
    return <ArtemisTable brokerMBeanName={broker.brokerMBeanName} loaded={true} jolokia={broker.jolokia} allColumns={allColumns} getData={listQueues}/>
}