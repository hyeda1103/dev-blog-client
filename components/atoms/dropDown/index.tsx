import React, { MouseEventHandler, useRef, useState } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

import {
  CaretDownIcon,
  CaretUpIcon,
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  ListItem,
} from "./styles";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Array<Option>;
  defaultValue?: string;
}

function Dropdown({ options, defaultValue }: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleToggle: MouseEventHandler = () => setIsOpen(!isOpen);

  const handleSelect: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen(!isOpen);
    setSelectedValue(e.currentTarget.id);
  };

  useOutsideClick(ref, () => {
    if (isOpen) setIsOpen(!isOpen);
  });

  return (
    <DropDownContainer>
      <DropDownHeader id="dropdown-header" isOpen={isOpen} onClick={handleToggle}>
        <p id="dropdown-default">{selectedValue}</p>
        {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer ref={ref}>
          <DropDownList>
            {options &&
              Object.values(options).map((option) => (
                <ListItem onClick={handleSelect} key={option.value} id={option.label}>
                  {option.label}
                </ListItem>
              ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

export default Dropdown;
