import axios from 'axios';

const axiosConfig = {
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
  },
};

const api = (options = {}) => {
  const fanalOptions = {
    ...axiosConfig,
    ...options,
    headers: {
      ...axiosConfig.headers,
      ...options.headers,
    },
  };
  return axios.request({ ...fanalOptions });
};

export default api;