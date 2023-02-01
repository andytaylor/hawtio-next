import { camel } from './camel'
import { connect } from './connect'
import { jmx } from './jmx'
import { artemis } from './artemis'

export const registerPlugins = () => {
  connect()
  jmx()
  camel()
  artemis()
}

export { jolokiaService } from './connect'
