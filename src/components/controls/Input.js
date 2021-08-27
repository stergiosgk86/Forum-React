import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({
  required,
  name,
  size,
  margin,
  label,
  variant,
  value,
  fullWidth,
  type,
  placeholder,
  autoFocus,
  onKeyPress,
  onChange,
  InputProps,
  error = null,
}) => {
  return (
    <TextField
      required={required}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder}
      variant={variant}
      autoComplete="off"
      margin={margin}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      autoFocus={autoFocus}
      InputProps={InputProps}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
