import axios from 'axios';
import { FlowState } from '../interfaces/FlowState';

export const fetchAccounts = async () =>
  axios.get('http://localhost:3000/api/accounts');

export const fetchTransactions = async (id: string) =>
  axios.get(`http://localhost:3000/api/transactions/${id}`);

export const fetchFlows = async () =>
  axios.get('http://localhost:3000/api/flows');

export const fetchFlowById = async (id: string) =>
  axios.get(`http://localhost:3000/api/flows/${id}`);

export const createFlow = async (data: FlowState) =>
  axios.post('http://localhost:3000/api/flows/create', data);
