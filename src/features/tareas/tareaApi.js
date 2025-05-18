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

const getByName = async (titulo) => {
  const response = await axios.get(`${API_URL}/titulo/${titulo}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
}

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
const iniciarTarea = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/iniciar`, {}, { // Method changed to POST, empty body
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
};

const completarTarea = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/completar`, {}, {  // Method changed to POST, empty body
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
};

const getTareasPorEstado = async (userId, estado) => {
    const response = await axios.get(`${API_URL}/estado/${estado}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { usuario: userId }
    });
    return response;
};

const getByDateRange = async (fechaInicio, fechaFin) => {
  const response = await axios.post(`${API_URL}/fechas`, { fechaInicio, fechaFin }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response;
};

export default {
  getAll,
  getByName,
  create,
  update,
  delete: deleteTask,
  iniciarTarea,
  completarTarea,
  getTareasPorEstado,
  getByDateRange
};