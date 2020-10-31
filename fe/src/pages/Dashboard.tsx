import React, { useContext, useEffect, useState } from 'react';
import AccountList from '../components/AccountList';
import FlowList from '../components/FlowList';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';
import { AuthContext } from '../context/AuthContext';
import { DashboardState } from '../interfaces/AuthState';
import { fetchAccounts, fetchTransactions } from '../utils/api';

interface Props {}

const flows = [
  {
    name: 'flow1',
    id: 1,
  },
  {
    name: 'flow2',
    id: 2,
  },
  {
    name: 'flow3',
    id: 3,
  },
  {
    name: 'flow4',
    id: 4,
  },
  {
    name: 'flow5',
    id: 5,
  },
];

const Dashboard: React.FC<Props> = () => {
  const {auth: {accountOrder}, setAuth} = useContext(AuthContext)

  const [data, setData] = useState<DashboardState>({
    accounts: [],
    transactions: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const accountRes = await fetchAccounts()
      const transactionRes = await fetchTransactions(accountRes.data[accountOrder].id)
      setData(state => ({...state, accounts: accountRes.data, transactions: transactionRes.data}))
    }
    fetchData()
  }, [])

  const handleAccountOrder = async (newAccountOrder: number) => {
    const transactionRes = await fetchTransactions(data.accounts[newAccountOrder].id)
    setData(state => ({...state, transactions: transactionRes.data}))
    setAuth((state: any) => ({...state, accountOrder: newAccountOrder}))
  }

  return (
    <Layout>
      <h1 className="mb-80 text-40 font-heading">Dashboard</h1>
      <FlowList data={flows} />
      <AccountList data={data.accounts} order={accountOrder} onChange={handleAccountOrder}/>
      <TransactionList data={data.transactions} />
    </Layout>
  );
};

export default Dashboard;
