import { Connection } from '@hawtio/plugins/connect/connections'
import { AttributeValues, jolokiaService } from '@hawtio/plugins/connect/jolokia-service'
import { escapeMBean } from '@hawtio/util/jolokia'
import Jolokia, { IJolokia, IRequest, IResponseFn } from 'jolokia.js'

import { joinPaths } from '@hawtio/util/urls'
import { log } from '../globals'


export type BrokerDetails = {
  name: string
  version: string
  brokerMBean: string
}

export type BrokerStatus = {
  globalMaxSize: number
  addressMemoryUsage: number
  used: number
  uptime: string
}

class StatusService {

  loadStatus = (globalMaxSize: number, addressMemoryUsage: number, uptime: string) => {
    var used = 0;
    var addressMemoryUsageMB = 0;
    var globalMaxSizeMB = globalMaxSize / 1048576;
    if (addressMemoryUsage > 0) {
      addressMemoryUsageMB = addressMemoryUsage / 1048576;
      used = addressMemoryUsageMB/globalMaxSizeMB * 100
    }
    var status: BrokerStatus = {
      globalMaxSize: globalMaxSizeMB,
      addressMemoryUsage: addressMemoryUsageMB,
      used: used,
      uptime: uptime
    }
    return status;
  }

  /**
   * Create a Jolokia instance with the given connection.
   */
  createJolokia(connection: Connection, checkCredentials = false): IJolokia {
      if (checkCredentials) {
        return new Jolokia({
          url: this.getJolokiaUrl(connection),
          method: 'post',
          mimeType: 'application/json',
          username: connection.username,
          password: connection.password
        })
      }
  
      return new Jolokia({
        url: this.getJolokiaUrl(connection),
        method: 'post',
        mimeType: 'application/json'
      })
    }

    /**
   * Get the Jolokia URL for the given connection.
   */
  getJolokiaUrl(connection: Connection): string {
    if (connection.jolokiaUrl) {
      log.debug("Using provided URL:", connection.jolokiaUrl)
      return connection.jolokiaUrl
    }

    // TODO: Better handling of doc base and proxy URL construction
    const url = joinPaths(
      '/proxy',
      connection.scheme || 'http',
      connection.host || 'localhost',
      String(connection.port || 80),
      connection.path)
    log.debug("Using URL:", url)
    return url
  }
}

export const statusService = new StatusService()
