import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NoEditFlow from '../components/NoEditFlow';
import { fetchFlowById } from '../utils/api';

interface Props {
  id?: string;
}

const Flow: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getFlow = async () => {
      const flowRes = await fetchFlowById(id as string);
      setData(flowRes.data);
    };
    getFlow();
  }, []);

  if (!data.id) return <div>Loading...</div>;

  return (
    <Layout>
      <NoEditFlow data={data} />
    </Layout>
  );
};

export default Flow;
