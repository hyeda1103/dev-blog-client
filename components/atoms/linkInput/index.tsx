import React, { ChangeEvent, ReactElement } from 'react';

import * as T from '@root/types'
import {
  StyledLabel,
  StyledInput,
  IconWrapper,
} from './styles';

interface Props {
  id: string
  icon: ReactElement
  type: string
  value?: string
  placeholder?: string
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void
  formErrors: T.Object
}

function LinkInput({
  id, icon, type, value, placeholder, handleChange, formErrors
}: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <IconWrapper error={!!formErrors[id]}>
        {icon}
      </IconWrapper>
      <StyledInput
        id={id}
        type={type}
        value={value || ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange(id)}
        error={!!formErrors[id]}
      />
    </StyledLabel>
  );
}

export default LinkInput;
