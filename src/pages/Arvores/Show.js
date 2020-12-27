import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import ChipItem from 'components/ChipItem';
import GridAction from 'components/Grid/GridAction';
import NatureIcon from '@material-ui/icons/Nature';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';

import useStyles from './styles';

const CollaboratorShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [arvore, setArvore] = useState({});
  const classes = useStyles();

  const center = {
    lat: -27.0922364,
    lng: -52.6166878,
  };
  const zoom = 13;

  const AnyReactComponent = ({ text }) => {
    return (
      <div>
        <LocationOnIcon />
      </div>
    );
  };

  useEffect(() => {
    async function getArvore() {
      setLoading(true);

      try {
        const response = await api.get(`/arvores/${id}`, {});
        setLoading(false);
        const { data } = response;

        setArvore(data);
      } catch (error) {
        setLoading(false);
        setArvore({});
        handlingErros(error);
      }
    }

    getArvore();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Árvores" onClick={() => navigate('/arvore')} />
        <Typography color="textPrimary">Árvore</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={NatureIcon}
        iconColor="green"
        title="Árvore"
        loading={loading}
      >
        <GridAction>
          <Button onClick={() => navigate(`/arvore/edit/${id}`)} color="orange">
            Editar
          </Button>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Especie" value={arvore?.especie} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Folha" value={arvore?.folha} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Fruto" value={arvore?.fruto} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Raiz" value={arvore?.raiz} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Altura" value={arvore?.altura} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Latitude" value={arvore?.latitude} />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Longitude" value={arvore?.longitude} />
          </GridItem>

          <GridItem xs={12} sm={1} md={1} lg={1} xl={1}>
            <InputLabel shrink>Gênero</InputLabel>
            <ChipItem label={arvore?.genero?.nome} color="secondary" />
          </GridItem>
          <GridItem xs={12} sm={1} md={1} lg={1} xl={1}>
            <InputLabel shrink>Familia</InputLabel>
            <ChipItem label={arvore?.familium?.nome} color="green" />
          </GridItem>
          <GridItem xs={12} sm={1} md={1} lg={1} xl={1}>
            <InputLabel shrink>Grupo</InputLabel>
            <ChipItem label={arvore?.grupo?.nome} color="red" />
          </GridItem>
          <GridItem xs={12} sm={1} md={1} lg={1} xl={1}>
            <InputLabel shrink>Origem</InputLabel>
            <ChipItem label={arvore?.origem?.nome} color="orange" />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyDLi08y2VHqz3iK_NJpBrw3Gq8SF1OZTAM',
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <AnyReactComponent
                  lat={arvore?.latitude}
                  lng={arvore?.longitude}
                  text="Teste"
                />
              </GoogleMapReact>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={classes.container}>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images5.alphacoders.com/330/thumb-1920-330278.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images.alphacoders.com/269/thumb-1920-26903.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images.alphacoders.com/402/thumb-1920-40261.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images6.alphacoders.com/509/thumb-1920-509076.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images5.alphacoders.com/351/thumb-1920-351860.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images5.alphacoders.com/403/thumb-1920-403932.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images4.alphacoders.com/590/thumb-1920-590348.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images8.alphacoders.com/410/thumb-1920-410009.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://assets.codepen.io/12005/bristol-harbor.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images7.alphacoders.com/326/thumb-1920-326825.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images8.alphacoders.com/409/thumb-1920-409581.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images8.alphacoders.com/454/thumb-1920-454579.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images6.alphacoders.com/304/thumb-1920-304028.jpg"
                  alt="arvore"
                />
              </figure>
              <figure className={classes.figure}>
                <img
                  className={classes.img}
                  src="https://images3.alphacoders.com/573/thumb-1920-57389.jpg"
                  alt="arvore"
                />
              </figure>
            </div>
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default CollaboratorShow;
