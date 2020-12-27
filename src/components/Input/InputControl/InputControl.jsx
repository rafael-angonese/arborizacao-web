import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// utils
import isPresent from 'utils/isPresent';

import useStyles from './styles';

function InputControl(props) {
  const {
    // FormControl props
    fullWidth,
    error,

    // label props
    label,
    labelShrink,

    // input props
    inputComponent,
    autoFocus,
    InputProps,
    required,
    disabled,
    value,
    name,
    onChange,

    // helperText props
    helperText,
  } = props;
  const classes = useStyles();
  const InputComponent = inputComponent;

  const handleChange = (arg1, arg2) => {
    if (arg1 && isPresent(arg1.nativeEvent)) {
      onChange({ [arg1.target.name]: arg1.target.value }, arg1);
    } else {
      onChange(arg1, arg2);
    }
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      classes={{ root: classes.formControlRoot }}
    >
      <InputLabel
        disabled={disabled}
        required={required}
        shrink={labelShrink}
        classes={{
          root: classes.labelRoot,
          shrink: classes.labelShrink,
          formControl: classes.labelFormControlWYSIWYG,
          asterisk: classes.asterisk,
        }}
      >
        {label}
      </InputLabel>
      <InputComponent
        {...InputProps}
        autoFocus={autoFocus}
        disabled={disabled}
        classes={{
          input: classes.inputElement,
          disabled: classes.labelDisabled,
        }}
        className={classes.inputWithoutLabel}
        required={required}
        name={name}
        value={value === null ? '' : value}
        onChange={isPresent(onChange) ? handleChange : undefined}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

InputControl.propTypes = {
  // FormControl props
  fullWidth: PropTypes.bool,
  error: PropTypes.bool.isRequired,

  // label props
  label: PropTypes.string.isRequired,
  labelShrink: PropTypes.bool,

  // input props
  // inputComponent: PropTypes.shape({}).isRequired,
  InputProps: PropTypes.shape({}),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
};

InputControl.defaultProps = {
  // FormControl props
  fullWidth: true,

  // label props
  labelShrink: true,

  // input props
  autoFocus: false,
  disabled: false,
  required: true,
  value: null,
  InputProps: {},
};

export default InputControl;
