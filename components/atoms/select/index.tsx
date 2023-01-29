import React from 'react';
import Select, { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

import * as T from '@/types'

const animatedComponents = makeAnimated();

const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (provided) => ({
    ...provided,
    background: "#fff",
    fontSize: "18px",
    border: "none",
    borderRadius: "0",
    color: "#161E2E",
    minHeight: "36px",
    height: "36px",
    boxShadow: "none"
  }),
  // 드롭다운 메뉴
  option: (provided) => ({
    ...provided,
    color: "#161E2E",
    fontSize: "16px",
    padding: "10px 16px",
    overflow: "hidden",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#161E2E",
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "36px",
    padding: "0 12px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
    color: "#161E2E",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "36px",
  }),
};

interface Props {
  options: Array<T.SelectOption>
  handleChange: ((newValue: Array<T.Category> | unknown, actionMeta: ActionMeta<unknown>) => void) | undefined
  isMulti: boolean
  placeholder: string
}

function ReactSelect({ options, handleChange, isMulti, placeholder }: Props) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={null}
      placeholder={placeholder}
      isMulti={isMulti}
      options={options}
      onChange={handleChange}
      styles={customStyles}
    />
  )
}

export default ReactSelect
