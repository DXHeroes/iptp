import axios from 'axios';

export const fetchAccounts = async () => axios.get("http://localhost:3000/api/accounts")

export const fetchTransactions = async (id: string) => axios.get(`http://localhost:3000/api/accounts/${id}/transactions`)