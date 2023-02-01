import React from 'react'
import { jmxDomain, log } from './globals'
import { AttributeValues, IJolokiaService, jolokiaService } from '@hawtio/plugins/connect/jolokia-service'
import { ActiveSort, Filter, SortDirection } from './list/ArtemisTable'
import Jolokia, { IJolokia } from 'jolokia.js'

export interface IArtemisService {
    getBrokerMBean(jolokia: IJolokia): string
    getProducers(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<unknown>
  }

  export interface Jolokias {
    [key: string]: IJolokia
  }

class ArtemisService implements IArtemisService {
  
  constructor() {
    }


    getBrokerMBean(jolokia: IJolokia): string {
        log.info("using domain " +jmxDomain + ":broker=* ")

        const attr = jolokia.getAttribute(jmxDomain + ":broker=*", "Name") ;
        log.info("*************" + attr);
        return attr as string;
    }

    async getProducers(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var producerFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(producerFilter) + " page " + page + " per page " + perPage);
        const producers = await jolokia.execute(mBean, 'listProducers(java.lang.String, int, int)', JSON.stringify(producerFilter), page, perPage ) as string;
        return producers;
    }

    async getConsumers(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var consumerFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(consumerFilter) + " page " + page + " per page " + perPage);
        const consumers = await jolokia.execute(mBean, 'listConsumers(java.lang.String, int, int)', JSON.stringify(consumerFilter), page, perPage ) as string;
        return consumers;
    }

    async getConnections(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var connectionsFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(connectionsFilter) + " page " + page + " per page " + perPage);
        const connections = await jolokia.execute(mBean, 'listConnections(java.lang.String, int, int)', JSON.stringify(connectionsFilter), page, perPage ) as string;
        return connections;
    }

    async getSessions(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var sessionsFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(sessionsFilter) + " page " + page + " per page " + perPage);
        const sessions = await jolokia.execute(mBean, 'listSessions(java.lang.String, int, int)', JSON.stringify(sessionsFilter), page, perPage ) as string;
        return sessions;
    }

    async geAddresses(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var addressesFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(addressesFilter) + " page " + page + " per page " + perPage);
        const addresses = await jolokia.execute(mBean, 'listAddresses(java.lang.String, int, int)', JSON.stringify(addressesFilter), page, perPage ) as string;
        return addresses;
    }

    async getQueues(jolokia: IJolokia, mBean: string, page: number, perPage: number, activeSort: ActiveSort, filter: Filter): Promise<string> {
        var queuesFilter = {
            field: filter.input != '' ? filter.column : '',
            operation: filter.input != '' ? filter.operation : '',
            value: filter.input,
            sortOrder: activeSort.order,
            sortColumn: activeSort.id
        };
        log.info("invoking with mbean " + mBean + " with " + JSON.stringify(queuesFilter) + " page " + page + " per page " + perPage);
        const queues = await jolokia.execute(mBean, 'listQueues(java.lang.String, int, int)', JSON.stringify(queuesFilter), page, perPage ) as string;
        return queues;
    }
}

export const artemisService = new ArtemisService()