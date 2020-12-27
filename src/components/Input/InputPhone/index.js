import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const InputPhone = ({ value, label, required, error, helperText, placeholder, onChange }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;

    let masked = value.replace(/\D/g, '');
    masked = masked.replace(/^(\d)/, '($1');
    masked = masked.replace(/(.{3})(\d)/, '$1) $2');
    if (masked.length > 6) {
      masked = masked.replace(/(.{5})(\d)/, '$1$2 ');
    }
    if (masked.length === 12) {
      masked = masked.replace(/(.{1})$/, '-$1');
    } else if (masked.length === 13) {
      masked = masked.replace(/(.{2})$/, '-$1');
    } else if (masked.length === 14) {
      masked = masked.replace(/(.{3})$/, '-$1');
    } else if (masked.length === 15) {
      masked = masked.replace(/(.{4})$/, '-$1');
    } else if (masked.length === 16) {
      masked = masked.replace(/(.{5})$/, '-$1');
    }
    masked = masked.replace(/(-\d{4})\d+?$/, '$1');

    onChange(masked);
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      label={label}
      value={value === null ? '' : value}
      onChange={handleChange}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth
      InputLabelProps={{
        classes: {
          asterisk: classes.asterisk,
        },
        // shrink: true,
      }}
    />
  );
};

export default InputPhone;
