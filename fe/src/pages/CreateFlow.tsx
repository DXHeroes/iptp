import React from 'react';
import Flow from '../components/Flow';
import Layout from '../components/Layout';

interface Props {}

const CreateFlow: React.FC<Props> = () => {
  const handleDrop = () => {
    
  }
  return (
    <Layout>
      <h1 className="mb-40 text-40 font-heading">Create flow</h1>
      <Flow handleDrop={handleDrop}/>
    </Layout>
  );
}

export default CreateFlow;
