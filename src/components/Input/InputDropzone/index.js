import React from 'react';

import CloudUpload from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';

import IconButton from 'components/Button/IconButton';
import Button from 'components/Button/Button';

const InputDropzone = ({ onChange, accept, label, buttonText }) => {

  return (
    <>
      <label
        htmlFor="upload-file"
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          style={{ display: 'none' }}
          id="upload-file"
          accept={accept}
          type="file"
          onChange={onChange}
        />
        <IconButton
          Icon={CloudUpload}
          height="200"
          width="200"
          iconColor="primary"
          component="span"
          tooltip='Importar'
        />
        <Typography ariant="body2">{label}</Typography>

        <Button color="secondary" component="span">
          {buttonText}
        </Button>
      </label>
</>
  );
};

export default InputDropzone;
