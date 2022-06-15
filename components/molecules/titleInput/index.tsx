import React, { ChangeEvent } from 'react';

import ErrorBox from '@root/components/molecules/errorBox';
import * as T from '@root/types'
import {
  StyledLabel,
  StyledInput,
} from './styles';

interface Props {
  id: string
  label: string
  value?: string
  placeholder?: string
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void
  formErrors: T.Object
}

function TitleInput({
  id, value, placeholder, handleChange, formErrors
}: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <StyledInput
        id={id}
        type='text'
        value={value || ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange(id)}
        error={!!formErrors[id]}
      />
    </StyledLabel>
  );
}

export default TitleInput;
