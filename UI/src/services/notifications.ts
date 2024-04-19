import axios from 'axios';
import { NewNotification, Notification } from '../types';
const baseUrl = 'http://localhost:3001/api/notifications';
// const baseUrl = 'http://localhost:3001/notifications';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (NewNotification: NewNotification) => {
  const response = await axios.post(baseUrl, NewNotification);
  return response.data;
};

const updateNotification = async (
  id: string | undefined,
  updatedNotification: Notification | undefined
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedNotification);

  return response.data;
};

const deleteNotification = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default {
  create,
  deleteNotification,
  getAll,
  updateNotification,
};
