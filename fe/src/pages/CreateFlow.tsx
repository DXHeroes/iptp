import React from 'react';
import Flow from '../components/Flow';
import Layout from '../components/Layout';

interface Props {}

const CreateFlow: React.FC<Props> = () => {
  return (
    <Layout>
      <h1 className="mb-40 text-40 font-heading">Create conditional payment</h1>
      <Flow />
    </Layout>
  );
};

export default CreateFlow;
