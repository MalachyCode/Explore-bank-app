import axios from 'axios';
import { ConfirmUserPin, NewUser, User } from '../types';
const baseUrl = 'http://localhost:3001/api/users';
// const baseUrl = 'http://localhost:3001/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newUser: NewUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

const updateUser = async (id: string, updatedUser: User) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedUser);

  return response.data;
};

const changeTransferPin = async (id: string, updatedUser: User) => {
  const response = await axios.put(
    `${baseUrl}/transfer-pin/${id}`,
    updatedUser
  );

  return response.data;
};

const resetPassword = async (id: string, updatedUser: User) => {
  const response = await axios.put(
    `${baseUrl}/reset-password/${id}`,
    updatedUser
  );

  return response.data;
};

const updateProfilePicture = async (id: string, formData: FormData) => {
  const response = await axios.put(`${baseUrl}/upload/${id}`, formData);

  return response.data;
};

const checkPin = async (user: ConfirmUserPin) => {
  const response = await axios.post(`${baseUrl}/check-pin`, user);
  return response.data;
};

export default {
  changeTransferPin,
  checkPin,
  create,
  deleteUser,
  getAll,
  getSingle,
  resetPassword,
  updateProfilePicture,
  updateUser,
};
