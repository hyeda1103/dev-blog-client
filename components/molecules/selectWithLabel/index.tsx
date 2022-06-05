import React from 'react';
import { ActionMeta } from 'react-select';

import ReactSelect from '@root/components/atoms/select';
import ErrorBox from '@root/components/molecules/errorBox';
import * as T from '@root/types'
import {
  Container,
  Text,
} from './styles';

interface Props {
  id: string
  label: string
  handleChange: ((newValue: Array<T.Category> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined
  formErrors: T.Object
  options: Array<T.SelectOption>
  isMulti: boolean
}

function SelectWithLabel({
  id, label, handleChange, formErrors, options, isMulti
}: Props) {
  return (
    <Container>
      <Text>
        {label}
      </Text>
      <ReactSelect
        options={options}
        handleChange={handleChange}
        isMulti={isMulti}
      />
      {formErrors[id] && (
        <ErrorBox error={formErrors[id]} />
      )}
    </Container>
  );
}

export default SelectWithLabel;
