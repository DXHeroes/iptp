import React from 'react';
import { Link } from '@reach/router';
import Button from '../components/Button';
import Layout from '../components/Layout';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="m-auto">
          <Button>
            <Link to="/dashboard">Login with BANK ID</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
