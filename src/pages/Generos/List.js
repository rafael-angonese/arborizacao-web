import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import WcIcon from '@material-ui/icons/Wc';

import handlingErros from 'utils/handlingErros';

import api from 'services/api';

const CollaboratorList = () => {
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [generos, setGeneros] = useState([]);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [generoDelete, setGeneroDelete] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  async function getData() {
    setLoading(true);

    try {
      const response = await api.get(`/generos.json`);
      setLoading(false);
      const { data } = response;

      setGeneros(data);
    } catch (error) {
      setLoading(false);
      handlingErros(error);
      setGeneros([]);
    }
  }

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/generos/${generoDelete.id}`, {});

      const newGenros = generos.filter((p) => p.id !== generoDelete.id);
      setGeneroDelete(null);
      setGeneros(newGenros);
      setLoadingDelete(false);
      setShowModalDelete(false);
      toast.success('Excluído com sucesso');
    } catch (error) {
      setLoadingDelete(false);
      handlingErros(error);
    }
  }


  useEffect(() => {
    getData();
  }, []);


  return (
    <CardContainer
      Icon={WcIcon}
      iconColor="blue"
      title="Gêneros"
      loading={loading}
    >
      <GridAction>
        <Button onClick={() => navigate('/genero/new')} color="primary">
          Novo
        </Button>
      </GridAction>

      <Table
        emptyData={generos.length === 0}
        loading={loading}
        columns={
          <>
            <TableCell className={classesTable.cell}>Ações</TableCell>
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Nome</TableCell>
            <TableCell className={classesTable.cell}>Descrição</TableCell>
          </>
        }
      >
        {generos.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <IconButton
                  tooltip='Exibir'
                  onClick={() => navigate(`/genero/show/${row.id}`)}
                  Icon={RemoveRedEyeIcon}
                  iconColor="green"
                />
                <IconButton
                  tooltip='Editar'
                  onClick={() => navigate(`/genero/edit/${row.id}`)}
                  Icon={EditIcon}
                  iconColor="orange"
                />
                <IconButton
                  tooltip='Excluir'
                  onClick={() => {
                    setGeneroDelete(row);
                    setShowModalDelete(true);
                  }}
                  Icon={DeleteIcon}
                  iconColor="red"
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.descricao}</TableCell>
            </TableRow>
          );
        })}
      </Table>

      <ModalDelete
        open={showModalDelete}
        loading={loadingDelete}
        message={'Realmente deseja remover este Gênero?'}
        buttonText='Excluir'
        onDelete={onDelete}
        onClose={() => {
          setShowModalDelete(false);
          setGeneroDelete(null);
        }}
      />
    </CardContainer>
  );
};

export default CollaboratorList;
