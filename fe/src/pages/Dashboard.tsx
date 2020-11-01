import React, { useContext, useEffect, useState } from 'react';
import AccountList from '../components/AccountList';
import FlowList from '../components/FlowList';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';
import { AuthContext } from '../context/AuthContext';
import { DashboardState } from '../interfaces/AuthState';
import { fetchAccounts, fetchFlows, fetchTransactions } from '../utils/api';

interface Props {}

const flows: any = [];

const Dashboard: React.FC<Props> = () => {
  const {
    auth: { accountOrder },
    setAuth,
  } = useContext(AuthContext);

  const [data, setData] = useState<DashboardState>({
    flows: [],
    accounts: [],
    transactions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const accountRes = await fetchAccounts();
      const transactionRes = await fetchTransactions(
        accountRes.data[accountOrder].id
      );
      const flowRes = await fetchFlows();
      setData((state) => ({
        ...state,
        flows: flowRes.data,
        accounts: accountRes.data,
        transactions: transactionRes.data,
      }));
    };
    fetchData();
  }, []);

  const handleAccountOrder = async (newAccountOrder: number) => {
    const transactionRes = await fetchTransactions(
      data.accounts[newAccountOrder].id
    );
    setData((state) => ({ ...state, transactions: transactionRes.data }));
    setAuth((state: any) => ({ ...state, accountOrder: newAccountOrder }));
  };

  return (
    <Layout>
      <h1 className="mb-80 text-40 font-heading">Dashboard</h1>
      <FlowList data={data.flows} />
      <AccountList
        data={data.accounts}
        order={accountOrder}
        onChange={handleAccountOrder}
      />
      <TransactionList data={data.transactions} />
    </Layout>
  );
};

export default Dashboard;
