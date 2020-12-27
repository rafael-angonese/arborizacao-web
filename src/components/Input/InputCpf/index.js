import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const InputPhone = ({ value, label, error, helperText, required, placeholder, onChange }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;

    const masked = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

    onChange(masked);
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      label={label}
      value={value === null ? '' : value}
      onChange={handleChange}
      fullWidth
      error={error}
      helperText={helperText}
      InputLabelProps={{
        classes: {
          asterisk: classes.asterisk
        },
        // shrink: true,
      }}
      required={required}
    />
  );
};

export default InputPhone;
