import React, { ChangeEvent } from 'react';

import ErrorBox from '@root/components/molecules/errorBox';
import * as T from '@root/types'
import {
  StyledLabel,
  Text,
  StyledInput,
} from './styles';

interface Props {
  id: string
  label: string
  type: string
  value?: string
  placeholder?: string
  handleChange: (keyName: string) => (e: ChangeEvent<HTMLInputElement>) => void
  formErrors: T.Object
}

function InputWithLabel({
  id, label, type, value, placeholder, handleChange, formErrors
}: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <Text>
        {label}
      </Text>
      <StyledInput
        id={id}
        type={type}
        value={value || ''}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange(id)}
        error={!!formErrors[id]}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </StyledLabel>
  );
}

export default InputWithLabel;
