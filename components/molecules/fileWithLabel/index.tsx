import React, { ChangeEventHandler } from "react";

import ErrorBox from "@/components/molecules/errorBox";
import * as T from "@/types";

import { StyledInput, StyledLabel, Text } from "./styles";

interface Props {
  id: string;
  label: string;
  type: string;
  accept?: string;
  handleChange: ChangeEventHandler<HTMLElement> | undefined;
  formErrors: T.Object;
}

function FileWithLabel({ id, label, type, accept, handleChange, formErrors }: Props) {
  return (
    <StyledLabel htmlFor={id}>
      <Text>{label}</Text>
      <StyledInput
        id={id}
        type={type}
        autoComplete="off"
        onChange={handleChange}
        accept={accept}
        error={!!formErrors[id]}
        hidden
      />
      {formErrors[id] && <ErrorBox error={formErrors[id]} />}
    </StyledLabel>
  );
}

export default FileWithLabel;
