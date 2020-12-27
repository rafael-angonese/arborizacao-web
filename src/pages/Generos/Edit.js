import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';

import CardContainer from 'components/Card/CardContainer';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputText from 'components/Input/InputText';
import Button from 'components/Button/Button';
import GridContainerFooter from 'components/Grid/GridContainerFooter';


import isPresent from 'utils/isPresent';
import api from 'services/api';
import yupValidator from 'utils/yupValidator';
import handlingErros from 'utils/handlingErros';

const CollaboratorEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();

    const genero = {
      nome,
      descricao,
    };

    console.log(genero)
    const schema = Yup.object().shape({
      nome: Yup.string().min(1).required('Nome é obrigatório'),
      descricao: Yup.string().min(1).required('Descrição é obrigatório'),
    });

    const validation = await yupValidator(schema, genero);

    setError(validation);
    if (isPresent(validation)) return;

    setLoading(true);
    try {
      const response = await api.put(`/generos/${id}`, genero);
      setLoading(false);
      const { data } = response;

      toast.success('Registro salvo com successo!');
      navigate(`/genero/show/${data.id}`);
    } catch (error) {
      setLoading(false);

      const validation = handlingErros(error);
      setError(validation);
    }
  }

  useEffect(() => {
    async function getGenero() {
      setLoading(true);

      try {
        const response = await api.get(`/generos/${id}`);
        setLoading(false);
        const { data } = response;

        setNome(data.nome);
        setDescricao(data.descricao);
      } catch (error) {
        setLoading(false);
        handlingErros(error);
      }
    }

    getGenero();
  }, [id]);

  return (
    <>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Chip label="Gêneros" onClick={() => navigate('/genero')} />
        <Typography color="textPrimary">Editando Gênero</Typography>
        );
      </Breadcrumbs>

      <CardContainer
        Icon={PersonIcon}
        iconColor="blue"
        title="Editando Gênero"
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

          <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
            <InputText
              value={descricao}
              label="Descrição"
              error={isPresent(error.descricao)}
              helperText={error.descricao}
              onChange={(text) => setDescricao(text)}
            />
          </GridItem>
        </GridContainer>

        <GridContainerFooter>
          <Button
            onClick={() => navigate('/genero')}
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

export default CollaboratorEdit;
