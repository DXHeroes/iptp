import React from 'react';
import FlowList from '../components/FlowList';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';

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

const transactions = [
  {
    id: 1,
    date: '2019-10-20',
    amount: {
      value: -4520.15,
      currency: 'CZK',
    },
    name: 'Pepa',
  },
  {
    id: 3,
    date: '2019-10-20',
    amount: {
      value: -69.15,
      currency: 'CZK',
    },
    name: 'Prokop',
  },
  {
    id: 2,
    date: '2019-10-20',
    amount: {
      value: -420.15,
      currency: 'CZK',
    },
    name: 'Kaja',
  },
];

const Dashboard: React.FC<Props> = () => {
  return (
    <Layout>
      <h1 className="mb-80 text-40 font-heading">Dashboard</h1>
      <FlowList data={flows} />
      <TransactionList data={transactions} />
    </Layout>
  );
};

export default Dashboard;
