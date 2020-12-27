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
  const [origem, setOrigem] = useState({});

  useEffect(() => {
    async function getOrigem() {
      setLoading(true);

      try {
        const response = await api.get(`/origems/${id}`, {});
        setLoading(false);
        const { data } = response;

        setOrigem(data);
      } catch (error) {
        setLoading(false);
        setOrigem({});
        handlingErros(error, 'collaborator');
      }
    }

    getOrigem();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Origens" onClick={() => navigate('/origem')} />
        <Typography color="textPrimary">Origem</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={WcIcon}
        iconColor="green"
        title="Origem"
        loading={loading}
      >
        <GridAction>
          <Button
            onClick={() => navigate(`/origem/edit/${id}`)}
            color="orange"
          >
            Editar
          </Button>
        </GridAction>

        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputShow label="Nome" value={origem?.nome} />
          </GridItem>

          <GridItem xs={12} sm={8} md={8} lg={8} xl={8}>
            <InputShow
              label="Descrição "
              value={origem?.descricao}
            />
          </GridItem>
        </GridContainer>
      </CardContainer>
    </>
  );
};

export default CollaboratorShow;
