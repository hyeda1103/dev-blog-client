import 'react-tippy/dist/tippy.css'
import { ReactNode } from 'react';
import {
  Tooltip,
} from 'react-tippy';

import { Title, Content } from './styles'

interface Props {
  tooltipContent: string
  children?: ReactNode
} 

export default function Tippy({ tooltipContent, children }: Props) {
  return (
    <Tooltip
      // options
      position="bottom"
      trigger="mouseenter"
      interactive
      duration={200}
      html={(
        <Title>{tooltipContent}</Title>
      )}
    >
      <Content>
      {children}
      </Content>
    </Tooltip>
  )
}
