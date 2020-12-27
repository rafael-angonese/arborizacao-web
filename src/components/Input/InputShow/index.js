import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const InputText = ({ value, label }) => {
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      value={value == null ? '' : value}
      label={label}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        className: classes.showInput,
        readOnly: true,
        disableUnderline: true,
      }}
    />
  );
};

export default InputText;
