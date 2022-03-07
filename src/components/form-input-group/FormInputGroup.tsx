import React from "react";

import "./formInputGroup.css";

export interface FormInputWrapperProps {
  identifier: string;
  labelText: string;
  showError?: boolean;
  errorText?: string;
}

export interface FormInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  value: string;
  placeholder: string;
}

interface FormInputGroupProps extends FormInputWrapperProps {
  children: React.ReactNode;
}

export const FormInputGroup = ({
  identifier,
  labelText,
  showError,
  errorText,
  children,
}: FormInputGroupProps): JSX.Element => {
  return (
    <div className="input-group">
      <label htmlFor={identifier} className="input-label">
        {labelText}
      </label>
      {children}
      {showError ? <div className="input-error-msg">{errorText}</div> : null}
    </div>
  );
};
