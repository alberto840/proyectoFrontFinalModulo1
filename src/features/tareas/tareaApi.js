import axios from 'axios';
const apiBasePath = process.env.REACT_APP_API_URL;
const API_URL = `${apiBasePath}/tareas`;

const getAll = async (userId) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    params: { usuario: userId }
  });
  return response;
};

const create = async (taskData) => {
  const response = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
};

const update = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
};

const deleteTask = async (id, userId) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { usuario: userId }
  });
  return response;
};

export default { getAll, create, update, delete: deleteTask };