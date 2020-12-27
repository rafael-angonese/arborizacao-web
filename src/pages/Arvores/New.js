import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import GoogleMapReact from 'google-map-react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import NatureIcon from '@material-ui/icons/Nature';
import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import InputSelectAsync from 'components/Input/InputSelectAsync';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';

const CollaboratorNew = ({ apiKey }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [generos, setGeneros] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [origens, setOrigens] = useState([]);

  const [especie, setEspecie] = useState('');
  const [folha, setFolha] = useState('');
  const [fruto, setFruto] = useState('');
  const [raiz, setRaiz] = useState('');
  const [altura, setAltura] = useState('');
  const [genero, setGenero] = useState();
  const [familia, setFamilia] = useState();
  const [grupo, setGrupo] = useState();
  const [origem, setOrigem] = useState();

  const [latitude, setLatitude] = useState('-27.0922364');
  const [longitude, setLongitude] = useState('-52.6166878');

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

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const arvore = {
      especie,
      folha,
      fruto,
      raiz,
      altura,
      latitude,
      longitude,
      genero_id: genero?.id,
      familium_id: familia?.id,
      grupo_id: grupo?.id,
      origem_id: origem?.id,
    };

    const schema = Yup.object().shape({
      especie: Yup.string().min(1).required('Espécie é obrigatório'),
      folha: Yup.string().min(1).required('Folha é obrigatório'),
      fruto: Yup.string().min(1).required('Fruto é obrigatório'),
      raiz: Yup.string().min(1).required('Raiz é obrigatório'),
      altura: Yup.string().min(1).required('Altura é obrigatório'),
      latitude: Yup.string().min(1).required('Latitude é obrigatório'),
      longitude: Yup.string().min(1).required('Longitude é obrigatório'),
      genero_id: Yup.string().min(1).required('Gênero é obrigatório'),
      familium_id: Yup.string().min(1).required('Família é obrigatório'),
      grupo_id: Yup.string().min(1).required('Grupo é obrigatório'),
      origem_id: Yup.string().min(1).required('Origem é obrigatório'),
    });

    const validation = await yupValidator(schema, arvore);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/arvores.json', arvore);
      setLoading(false);
      const { data } = response;

      toast.success('Registro salvo com sucesso!');
      navigate(`/arvore/show/${data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getGeneros() {
      setLoading(true);

      try {
        const response = await api.get(`/generos.json`);
        setLoading(false);
        const { data } = response;

        setGeneros(data);
      } catch (error) {
        setLoading(false);
        setGeneros([]);
        handlingErros(error);
      }
    }

    async function getFamilias() {
      setLoading(true);

      try {
        const response = await api.get(`/familias.json`);
        setLoading(false);
        const { data } = response;

        setFamilias(data);
      } catch (error) {
        setLoading(false);
        setFamilias([]);
        handlingErros(error);
      }
    }

    async function getGrupos() {
      setLoading(true);

      try {
        const response = await api.get(`/grupos.json`);
        setLoading(false);
        const { data } = response;

        setGrupos(data);
      } catch (error) {
        setLoading(false);
        setGrupos([]);
        handlingErros(error);
      }
    }

    async function getOrigens() {
      setLoading(true);

      try {
        const response = await api.get(`/origems.json`);
        setLoading(false);
        const { data } = response;

        setOrigens(data);
      } catch (error) {
        setLoading(false);
        setOrigens([]);
        handlingErros(error);
      }
    }

    getGeneros();
    getFamilias();
    getGrupos();
    getOrigens();
  }, []);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label={'Árvores'} onClick={() => navigate('/arvore')} />
        <Typography color="textPrimary">Nova Árvore</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={NatureIcon}
        iconColor="green"
        title={'Nova Árvore'}
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={especie}
              label="Espécie"
              error={isPresent(error.especie)}
              helperText={error.especie}
              required
              onChange={(text) => setEspecie(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={folha}
              label="Folha"
              error={isPresent(error.folha)}
              required
              helperText={error.folha}
              onChange={(text) => setFolha(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={fruto}
              label="Fruto"
              required
              error={isPresent(error.fruto)}
              helperText={error.fruto}
              onChange={(text) => setFruto(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={raiz}
              label="Raiz"
              required
              error={isPresent(error.raiz)}
              helperText={error.raiz}
              onChange={(text) => setRaiz(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={altura}
              label="Altura"
              required
              error={isPresent(error.altura)}
              helperText={error.altura}
              onChange={(text) => setAltura(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelectAsync
              options={generos}
              name="nome"
              optionValue="id"
              value={genero}
              loading={loading}
              error={isPresent(error.genero_id)}
              helperText={error.genero_id}
              required
              label="Gênero"
              placeholder="Buscar"
              onChange={setGenero}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelectAsync
              options={familias}
              name="nome"
              optionValue="id"
              value={familia}
              loading={loading}
              error={isPresent(error.familium_id)}
              helperText={error.familium_id}
              required
              label="Familia"
              placeholder="Buscar"
              onChange={setFamilia}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelectAsync
              options={grupos}
              name="nome"
              optionValue="id"
              value={grupo}
              loading={loading}
              error={isPresent(error.grupo_id)}
              helperText={error.grupo_id}
              required
              label="Grupo"
              placeholder="Buscar"
              onChange={setGrupo}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputSelectAsync
              options={origens}
              name="nome"
              optionValue="id"
              value={origem}
              loading={loading}
              error={isPresent(error.origem_id)}
              helperText={error.origem_id}
              required
              label="Origem"
              placeholder="Buscar"
              onChange={setOrigem}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={latitude}
              label="Latitude"
              error={isPresent(error.latitude)}
              helperText={error.latitude}
              required
              onChange={(text) => setLatitude(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={longitude}
              label="Longitude"
              error={isPresent(error.longitude)}
              helperText={error.longitude}
              required
              onChange={(text) => setLongitude(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'key_maps_google',
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <AnyReactComponent
                  lat={latitude}
                  lng={longitude}
                  text="Teste"
                />
              </GoogleMapReact>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/arvore')}
            disabled={loading}
            color="grey"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={loading}
            loading={loading}
            color="success"
          >
            Salvar
          </Button>
        </GridContainerFooter>
      </CardContainer>
    </>
  );
};

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDLi08y2VHqz3iK_NJpBrw3Gq8SF1OZTAM'
// })(CollaboratorNew)

export default CollaboratorNew;
