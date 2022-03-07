import React from "react";
import TextField from "@mui/material/TextField";

import {
  FormInputGroup,
  FormInputProps,
  FormInputWrapperProps,
} from "../form-input-group/FormInputGroup";

export const TextInput = ({
  onChange,
  onBlur,
  value,
  placeholder,
  identifier,
  showError,
  ...props
}: FormInputWrapperProps & FormInputProps): JSX.Element => {
  return (
    <FormInputGroup identifier={identifier} showError={showError} {...props}>
      <TextField
        required
        fullWidth
        id={identifier}
        name={identifier}
        onChange={onChange}
        onBlur={onBlur}
        label={placeholder}
        value={value}
        error={showError}
      />
    </FormInputGroup>
  );
};
