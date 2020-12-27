import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import useStyles from './styles';

const Container = ({ Icon, iconColor, loading, title, actions, children }) => {
  const classes = useStyles();
  return (
    <Card
      classes={{
        root: classes.root,
      }}
    >
      <CardHeader
        classes={{
          root: clsx(classes.rootHeader, classes[iconColor]),
          avatar: classes.avatar,
        }}
        avatar={
          loading ? (
            <CircularProgress
              className={clsx(classes.loading, classes.loading)}
            />
          ) : (
            <Icon className={clsx(classes.icon, classes.iconHeader)} />
          )
        }
      />
      <CardContent>
        <div>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>

          <div
            className={classes.flex}
          >
            {actions}
          </div>
        </div>

        {loading && <LinearProgress style={{ height: 4 }} color="secondary" />}
        {children}
        {loading && <LinearProgress style={{ height: 4 }} color="secondary" />}
      </CardContent>

      {/* <CardContent>
        <div className={classes.spaceBetween}>
          <div>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          </div>

          <div className={classes.flex}>{actions}</div>
        </div>
        {children}
      </CardContent> */}
    </Card>
  );
};

export default Container;
