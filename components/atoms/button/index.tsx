import React, { MouseEventHandler } from 'react'
import { BasicButton } from './styles';

interface Props {
  disabled?: boolean
  onClick?: MouseEventHandler
  children: string
}

const Button = ({ disabled, onClick, children }: Props) => {
  return (
    <BasicButton type="submit" disabled={disabled} onClick={onClick}>
      {children}
    </BasicButton>
  )
}

export default Button