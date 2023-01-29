import React from 'react'

import * as T from '@/types'
import { Tag } from './styles';

interface Props {
  status: T.Status
}

function StatusTag({ status }: Props) {
  
  const tagColor = ((status: T.Status) => {
    switch (status) {
      case T.Status.In_Progress:
        return {
          background: '#fbf3da',
          color: '#dfab00',
        };
      case T.Status.Completed:
        return {
          background: '#ddedea',
          color: '#0e7b6c'
        };
      default:
        return {
          background: '#ddebf1',
          color: '#0c6e99'
        };
    }
  })(status)
  
  return (
    <Tag tagColor={tagColor}>{status}</Tag>
  )
}

export default StatusTag
