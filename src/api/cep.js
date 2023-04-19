import axios from 'axios';

export default {
  queryCep: (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`),
}
