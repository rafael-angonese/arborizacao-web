import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import LinearProgress from 'components/LinearProgress';
import HelperText from 'components/HelperText';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import yupValidator from 'utils/yupValidator';
import isPresent from 'utils/isPresent';
import { useAuth } from 'contexts/auth';
import useStyles from './styles';
import api from 'services/api';
import { API } from 'config/uri';
import handlingErros from 'utils/handlingErros';
import deserialize from 'utils/deserialize';
import logo from 'assets/images/logo-small.png';

const Login = () => {
  const classes = useStyles();
  const { setToken, setAuthUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(event) {
    event.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string().trim().required().email(),
      password: Yup.string().trim().required(),
    });

    const validation = await yupValidator(schema, 'login', {
      email,
      password,
    });
    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/auth/authenticate', {
        email,
        password,
      });
      const { token, refreshToken } = await response.data;


      setToken(token, refreshToken);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const user = await api.get(`${API}/user_profile`);

      const deserializeData = await deserialize(user.data);

      setAuthUser(deserializeData);

      toast.success('Login realizado com sucesso');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error, 'login');
      setError(validation);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.imageLogoRoot}>
          <img src={logo} alt="logo" className={classes.imageLogo} />
        </div>

        <Typography className={classes.title} component="h1" variant="h5">
          {t('login.title')}
        </Typography>

        <LinearProgress loading={loading} />

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputText
              autoFocus
              value={email}
              label={t('collaborator.attributes.email')}
              error={isPresent(error.email)}
              helperText={error.email}
              required
              onChange={(text) => setEmail(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputText
              value={password}
              label={t('collaborator.attributes.password')}
              error={isPresent(error.password)}
              helperText={error.password}
              required
              InputProps={{
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(text) => setPassword(text)}
            />
          </GridItem>
        </GridContainer>

        <HelperText error={isPresent(error.error)} text={error.error} />

        <Button
          classes={{ root: classes.submit }}
          color="success"
          disabled={loading}
          loading={loading}
          onClick={handleLogin}
        >
          {t('login.extras.confirm')}
        </Button>

        <LinearProgress loading={loading} />
      </Paper>
    </div>
  );
};

export default Login;
