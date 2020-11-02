import axios from 'axios';
import { FlowState } from '../interfaces/FlowState';
import { UrlEnums } from './url.enum';

export const fetchAccounts = async () =>
  axios.get(`${UrlEnums.API_URL}/accounts`);

export const fetchTransactions = async (id: string) =>
  axios.get(`${UrlEnums.API_URL}/transactions/${id}`);

export const fetchFlows = async () => axios.get(`${UrlEnums.API_URL}/flows`);

export const fetchFlowById = async (id: string) =>
  axios.get(`${UrlEnums.API_URL}/flows/${id}`);

export const createFlow = async (data: FlowState) =>
  axios.post(`${UrlEnums.API_URL}/flows/create`, data);
