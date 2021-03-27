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
    url: "http://127.0.0.1:8000/game/room/",
    headers: {
      ...axiosConfig.headers,
      ...options.headers,
    },
  };
  return axios.request({ ...fanalOptions });
};

export default api;