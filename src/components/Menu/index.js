import React from 'react';
import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import User from './User';
import useStyles from './styles';
import items from './routeItems';

const Menu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className={classes.grow}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: 32,
              marginLeft: 10,
            }}
          >
            Arborização Chapecó
          </Typography>

          <div className={classes.grow} />

          <List className={classes.list}>
            {items.map((item) => (
              <ListItem className={classes.listItem} key={item.path}>
                <Button
                  className={clsx(
                    classes.navLink,
                    pathnames[0] === item.root && classes.navLinkActive
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <item.Icon />
                  {item.name}
                </Button>
              </ListItem>
            ))}
          </List>

          <User />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
