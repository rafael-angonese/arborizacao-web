import React from 'react';
// import { useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

export default function MediaControlCard({
  Icon,
  loading,
  value,
  text,
  iconColor,
}) {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Avatar
          className={classes[iconColor]}
          variant="rounded"
          style={{ height: 60, width: 60 }}
        >
          {loading ? <CircularProgress /> : <Icon />}
        </Avatar>
      </CardContent>

      <CardContent className={classes.cardContent}>
        <Typography className={classes.quantity} variant="h4" color="secondary">
          {value}
        </Typography>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );
}
