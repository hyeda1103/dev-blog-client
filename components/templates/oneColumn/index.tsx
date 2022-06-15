import React, { ReactNode } from 'react'

import { Root } from './styles';

interface Props {
  children: ReactNode
}

function OneColumn({ children }: Props) {
  return (
    <Root>{children}</Root>
  )
}

export default OneColumn