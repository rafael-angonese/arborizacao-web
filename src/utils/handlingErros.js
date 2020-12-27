import { toast } from 'react-toastify';
import isPresent from 'utils/isPresent';

const handlingErros = (error) => {
  // Error 😨 🚀
  const errorMessages = {};
  if (error.response) {
    const { data, status } = error.response;

    if (status === 401) {
      toast.error('Credenciais inválidas');
    }
    if (status === 403) {
      toast.error('Acesso negado');
    }
    if (status === 404) {
      toast.error('A página requisitada não foi encontrada');
    }
    if (status === 500) {
      toast.error('Erro interno do servidor');
    }
    if (isPresent(data.errors)) {
      data.errors.forEach((item) => {
        if (item.status === '422') {
          errorMessages[item.source.pointer] = `${item.detail}`;
        }
      });
    }
  } else if (error.request) {
    toast.error('Falha na conexão, sugerimos que verifique sua conexão de internet ou tente novamente mais tarde');
  } else {
    toast.error('Algo aconteceu ao configurar a solicitação e acionou um erro, sugerimos que você tente recarregar esta página');
  }

  return errorMessages;
};

export default handlingErros;
