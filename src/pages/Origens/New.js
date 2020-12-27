import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';
import WcIcon from '@material-ui/icons/Wc';

import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';

const CollaboratorNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const origem = {
      nome,
      descricao,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().min(1).required('Nome é obrigatório'),
      descricao: Yup.string().min(1).required('Descrição é obrigatório'),
    });

    const validation = await yupValidator(schema, origem);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.post('/origems.json', origem);
      setLoading(false);
      const { data } = response;

      toast.success('Registro salvo com sucesso!');
      navigate(`/origem/show/${data.id}`);
    } catch (error) {
      setLoading(false);
      const validation = handlingErros(error);
      setError(validation);
    }
  }

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label={'Origens'} onClick={() => navigate('/origem')} />
        <Typography color="textPrimary">Novo Origem</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={WcIcon}
        iconColor="blue"
        title={'Novo Origem'}
        loading={loading}
      >
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={nome}
              label="Nome"
              error={isPresent(error.nome)}
              helperText={error.nome}
              required
              onChange={(text) => setNome(text)}
            />
          </GridItem>

          <GridItem xs={12} sm={8} md={8} lg={8} xl={8}>
            <InputText
              value={descricao}
              label="Descrição"
              error={isPresent(error.descricao)}
              required
              helperText={error.descricao}
              onChange={(text) => setDescricao(text)}
            />
          </GridItem>

        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/origem')}
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

export default CollaboratorNew;
