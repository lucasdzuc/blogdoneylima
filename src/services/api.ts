import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blogdoneylima.com.br/wp-json',
})

export default api;