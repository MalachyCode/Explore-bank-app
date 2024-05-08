import axios from 'axios';
import { BarChartInfo, FindUserAccountsType, NewBarChartInfo } from '../types';
const baseUrl = 'http://localhost:3001/api/bar-chart-info';
// const baseUrl = 'http://localhost:3002/bar-chart-info';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (NewBarChartInfo: NewBarChartInfo) => {
  const response = await axios.post(baseUrl, NewBarChartInfo);
  return response.data;
};

const updateBarChartInfo = async (
  id: string,
  updatedBarChartInfo: BarChartInfo
) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBarChartInfo);

  return response.data;
};

const findUserBarChartInfo = async (owner: FindUserAccountsType) => {
  const response = await axios.post(`${baseUrl}/user-bar-chart-info`, owner);
  return response.data;
};

const deleteBarChartInfo = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.data;
};

export default {
  create,
  deleteBarChartInfo,
  findUserBarChartInfo,
  getAll,
  updateBarChartInfo,
};
