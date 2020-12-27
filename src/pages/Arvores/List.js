import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import NatureIcon from '@material-ui/icons/Nature';

import CardContainer from 'components/Card/CardContainer';
import Button from 'components/Button/Button';
import ModalDelete from 'components/Modal/ModalDelete';
import GridAction from 'components/Grid/GridAction';
import Table from 'components/Table/Table';
import tableStyles from 'components/Table/Table/styles';
import IconButton from 'components/Button/IconButton';
import ChipItem from 'components/ChipItem';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

import handlingErros from 'utils/handlingErros';
import api from 'services/api';

import ModalQrCode from './components/qrCode';

const CollaboratorList = () => {
  const classesTable = tableStyles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [arvores, setArvores] = useState([]);

  const [open, setOpen] = useState(false);
  const [arvoreOpen, setArvoreOpen] = useState(null)

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [arvoreDelete, setArvoreDelete] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  async function getData() {
    setLoading(true);

    try {
      const response = await api.get(`/arvores.json`);
      setLoading(false);
      const { data } = response;

      setArvores(data);
    } catch (error) {
      setLoading(false);
      setArvores([]);
      handlingErros(error);
    }
  }

  async function onDelete() {
    setLoadingDelete(true);

    try {
      await api.delete(`/arvores/${arvoreDelete.id}`, {});

      const newArvores = arvores.filter((p) => p.id !== arvoreDelete.id);
      setArvoreDelete(null);
      setArvores(newArvores);
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
      Icon={NatureIcon}
      iconColor="green"
      title="Árvores"
      loading={loading}
    >
      <GridAction>
        <Button onClick={() => navigate('/arvore/new')} color="primary">
          Novo
        </Button>
      </GridAction>

      <Table
        emptyData={arvores.length === 0}
        loading={loading}
        columns={
          <>
            <TableCell className={classesTable.cell}>Ações</TableCell>
            <TableCell className={classesTable.cell}>Código</TableCell>
            <TableCell className={classesTable.cell}>Espécie</TableCell>
            <TableCell className={classesTable.cell}>Folha</TableCell>
            <TableCell className={classesTable.cell}>Fruto</TableCell>
            <TableCell className={classesTable.cell}>Raiz</TableCell>
            <TableCell className={classesTable.cell}>Altura</TableCell>
            <TableCell className={classesTable.cell}>Gênero</TableCell>
            <TableCell className={classesTable.cell}>Família</TableCell>
            <TableCell className={classesTable.cell}>Grupo</TableCell>
            <TableCell className={classesTable.cell}>Origem</TableCell>
          </>
        }
      >
        {arvores.map((row) => {
          return (
            <TableRow key={row.id} hover className={classesTable.row}>
              <TableCell>
                <IconButton
                  tooltip="QR Code"
                  onClick={() => {
                    setOpen(true)
                    setArvoreOpen(row)
                  }}
                  Icon={DeveloperModeIcon}
                  iconColor="secondary"
                />
                <IconButton
                  tooltip='Visualizar'
                  onClick={() => navigate(`/arvore/show/${row.id}`)}
                  Icon={RemoveRedEyeIcon}
                  iconColor="green"
                />
                <IconButton
                  tooltip='Editar'
                  onClick={() => navigate(`/arvore/edit/${row.id}`)}
                  Icon={EditIcon}
                  iconColor="orange"
                />
                <IconButton
                  tooltip='Excluir'
                  onClick={() => {
                    setArvoreDelete(row);
                    setShowModalDelete(true);
                  }}
                  Icon={DeleteIcon}
                  iconColor="red"
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.especie}</TableCell>
              <TableCell>{row.folha}</TableCell>
              <TableCell>{row.fruto}</TableCell>
              <TableCell>{row.raiz}</TableCell>
              <TableCell>{row.altura}</TableCell>
              <TableCell>
                <ChipItem label={row?.genero?.nome} color="green" />
              </TableCell>
              <TableCell>
                <ChipItem label={row?.familium?.nome} color="green" />
              </TableCell>
              <TableCell>
                <ChipItem label={row?.grupo?.nome} color="green" />
              </TableCell>
              <TableCell>
                <ChipItem label={row?.origem?.nome} color="green" />
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      <ModalDelete
        open={showModalDelete}
        loading={loadingDelete}
        message={'Realmente deseja remover está Árvore?'}
        buttonText='Remover'
        onDelete={onDelete}
        onClose={() => {
          setShowModalDelete(false);
          setArvoreDelete(null);
        }}
      />

      <ModalQrCode
        open={open}
        arvore={arvoreOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </CardContainer>
  );
};

export default CollaboratorList;
