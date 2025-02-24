import {
  Button,
  ClipboardCopy,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextArea,
  TextInput,
} from '@patternfly/react-core'
import React, { useContext, useEffect, useState } from 'react'
import { MBeanTreeContext } from '../context'
import { attributeService } from './attribute-service'

export type AttributeModalProps = {
  isOpen: boolean
  onClose: () => void
  input: { name: string; value: string }
}

export const AttributeModal: React.FunctionComponent<AttributeModalProps> = props => {
  const { node } = useContext(MBeanTreeContext)
  const { isOpen, onClose, input } = props
  const { name, value } = input
  const [jolokiaUrl, setJolokiaUrl] = useState('Loading...')

  useEffect(() => {
    if (!node || !node.objectName) {
      return
    }

    const mbean = node.objectName
    const buildUrl = async () => {
      const url = await attributeService.buildUrl(mbean, name)
      setJolokiaUrl(url)
    }
    buildUrl()
  }, [node, name])

  if (!node || !node.mbean || !node.objectName) {
    return null
  }

  const attribute = node.mbean.attr[name]
  if (!attribute) {
    return null
  }

  const modalTitle = `Attribute: ${input.name}`

  return (
    <Modal
      variant={ModalVariant.medium}
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        <Button key='close' onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Form id='attribute-form' isHorizontal>
        <FormGroup label='Name' fieldId='attribute-form-name'>
          <TextInput id='attribute-form-name' name='attribute-form-name' value={name} readOnlyVariant='default' />
        </FormGroup>
        <FormGroup label='Description' fieldId='attribute-form-description'>
          <TextArea
            id='attribute-form-description'
            name='attribute-form-description'
            value={attribute.desc}
            readOnlyVariant='default'
          />
        </FormGroup>
        <FormGroup label='Type' fieldId='attribute-form-type'>
          <TextInput
            id='attribute-form-type'
            name='attribute-form-type'
            value={attribute.type}
            readOnlyVariant='default'
          />
        </FormGroup>
        <FormGroup label='Jolokia URL' fieldId='attribute-form-jolokia-url'>
          <ClipboardCopy isReadOnly>{jolokiaUrl}</ClipboardCopy>
        </FormGroup>
        <FormGroup label='Value' fieldId='attribute-form-value'>
          <TextInput id='attribute-form-value' name='attribute-form-value' value={value} readOnlyVariant='default' />
        </FormGroup>
      </Form>
    </Modal>
  )
}
