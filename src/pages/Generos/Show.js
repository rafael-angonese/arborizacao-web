import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputShow from 'components/Input/InputShow';
import Button from 'components/Button/Button';
import GridAction from 'components/Grid/GridAction';
import WcIcon from '@material-ui/icons/Wc';

import api from 'services/api';
import handlingErros from 'utils/handlingErros';

const CollaboratorShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [genero, setGenero] = useState({});

  useEffect(() => {
    async function getGenero() {
      setLoading(true);

      try {
        const response = await api.get(`/generos/${id}`, {});
        setLoading(false);
        const { data } = response;

        setGenero(data);
      } catch (error) {
        setLoading(false);
        setGenero({});
        handlingErros(error, 'collaborator');
      }
    }

    getGenero();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Gêneros" onClick={() => navigate('/genero')} />
        <Typography color="textPrimary">Gênero</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={WcIcon}
        iconColor="green"
        title="Gênero"
        loading={loading}
      >
        <GridAction>
          <Button
            onClick={() => navigate(`/genero/edit/${id}`)}
            color="orange"
          >
            Editar
          </Button>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Nome" value={genero?.nome} />
          </GridItem>

          <GridItem xs={12} sm={8} md={8} lg={8} xl={8}>
            <InputShow
              label="Descrição "
              value={genero?.descricao}
            />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default CollaboratorShow;
