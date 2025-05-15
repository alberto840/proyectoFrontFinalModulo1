import axios from 'axios';
const apiBasePath = process.env.REACT_APP_API_URL;
const API_URL = `${apiBasePath}/auth`;

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export default { login };