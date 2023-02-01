import React, { useEffect, useState } from 'react'
import { Tabs, Tab, TabTitleText, Checkbox, Tooltip, PageSection, TextContent, PageSectionVariants, Text, Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent } from '@patternfly/react-core';
import { Status } from './status/Status'
import { log } from './globals'

export const ArtemisNetwork: React.FunctionComponent = () => {
useEffect(() => {
    log.info("rendered Artemis")
  })

  const panelContent = (
      <DrawerPanelContent>
      </DrawerPanelContent>
  )
  
  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Projects</Text>
            <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
          </TextContent>
        </PageSection>
        <PageSection isFilled padding={{ default: 'noPadding' }}>
          <Status/>
      </PageSection>
     </React.Fragment>
  )
}
