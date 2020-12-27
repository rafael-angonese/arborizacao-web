import WcIcon from '@material-ui/icons/Wc';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import NatureIcon from '@material-ui/icons/Nature';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import { collaborator, genero, familia, grupo, origem } from 'config/routes';

const routes = [
  {
    ...collaborator,
    Icon: NatureIcon,
  },
  {
    ...genero,
    Icon: WcIcon,
  },
  {
    ...familia,
    Icon: NaturePeopleIcon,
  },
  {
    ...grupo,
    Icon: GroupWorkIcon,
  },
  {
    ...origem,
    Icon: TripOriginIcon,
  },
];

export default routes;
