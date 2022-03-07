import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import {
  FormInputGroup,
  FormInputProps,
  FormInputWrapperProps,
} from "../form-input-group/FormInputGroup";

interface SelectInputProps extends FormInputWrapperProps, FormInputProps {
  options?: string[];
}

export const SelectInput = ({
  onChange,
  onBlur,
  value,
  placeholder,
  identifier,
  showError,
  options,
  ...props
}: SelectInputProps): JSX.Element => {
  return (
    <FormInputGroup identifier={identifier} showError={showError} {...props}>
      <TextField
        required
        select
        fullWidth
        id={identifier}
        name={identifier}
        onChange={onChange}
        onBlur={onBlur}
        label={placeholder}
        value={value}
        error={showError}
      >
        {options?.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormInputGroup>
  );
};
