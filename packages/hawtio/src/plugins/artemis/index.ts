import { hawtio } from '@hawtio/core'
// import { helpRegistry } from '@hawtio/help/registry'
import { workspace, treeProcessorRegistry } from '@hawtio/plugins/shared'
import { jmxDomain } from './globals'
//import { processTreeDomain } from './tree-processor'
// import { preferencesRegistry } from '@hawtio/preferences/registry'
import { ArtemisNetwork } from './ArtemisNetwork'
import { Artemis } from './Artemis'
// import { CamelPreferences } from './CamelPreferences'
// import help from './help.md'
// import { jolokiaService } from './jolokia-service'

export const artemis = () => {
  hawtio.addPlugin({
    id: 'artemis network',
    title: 'Artemis Network',
    path: '/artemis-network',
    component: ArtemisNetwork,
    isActive: async () => {
      return true
    },
  })

  hawtio.addPlugin({
      id: 'artemis',
      title: 'Artemis',
      path: '/artemis',
      component: Artemis,
      isActive: async () => {
        return true
      },
    })

 // treeProcessorRegistry.add(jmxDomain, processTreeDomain)
  // helpRegistry.add('camel', 'Camel', help, 11)
  // preferencesRegistry.add('camel', 'Camel', ConnectPreferences, 11)
}
