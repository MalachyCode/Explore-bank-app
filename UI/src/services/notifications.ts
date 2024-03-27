import axios from 'axios';
import { NewNotification, Notification } from '../types';
const baseUrl = 'http://localhost:3001/notifications';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser: NewNotification) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const updateUser = async (
  id: string | undefined,
  updatedUser: Notification | undefined
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedUser);

  return response.data;
};
export default {
  getAll,
  create,
  updateUser,
};
