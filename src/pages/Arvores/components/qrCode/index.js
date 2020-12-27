import React from 'react';
import QRCode from 'qrcode.react';
import { URL } from 'config/uri';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from 'components/Button/Button';

const ModalQrCode = ({ open, onClose, arvore }) => {
  const downloadQR = () => {
    const canvas = document.getElementById(`${arvore?.id}`);
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${arvore?.id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <AppBar style={{ position: 'relative' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">QR Code</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <QRCode
            id={arvore?.id}
            value={`${URL}/arvore/show/${arvore?.id}`}
            size={290}
            level={'L'}
            includeMargin={true}
          />
        </div>
        <Button onClick={downloadQR} color="primary">
          Download QR
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModalQrCode;
