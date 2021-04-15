import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ name, label, value, placeholder, onChange, error = null }) => {
  return (
    <TextField
      fullWidth={true}
      size="small"
      label={label}
      placeholder={placeholder}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
