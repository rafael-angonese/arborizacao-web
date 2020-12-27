import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useStyles from './styles';

const InputSelect = ({ options, placeholder, value, name, onChange, label, required }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option[name]}
      openOnFocus
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      classes={{
        option: classes.option,
      }}
      noOptionsText='Não há opções'
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder == null ? 'Selecione' : placeholder}
          label={label}
          required={required}
          InputLabelProps={{
            classes: {
              asterisk: classes.asterisk,
            },
            // shrink: true,
          }}
          variant="outlined"
        />
      )}
    />
  );
};

export default InputSelect;
