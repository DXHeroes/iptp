import React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="m-auto">
          <Button>
            <a href="http://localhost:3000/api/auth/linkedin">
              Login with BANK ID
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
