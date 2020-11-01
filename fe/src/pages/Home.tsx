import React from 'react';
import Layout from '../components/Layout';
import { ReactComponent as Logo } from '../assets/icons/bankID.svg';
import { Link } from '@reach/router';

interface Props {}

const Home: React.FC<Props> = () => (
  <Layout>
    <section className="pt-100">
      <h1 className="mb-20 text-40 font-heading leading-normal">
        Bank transactions
        <br /> reimagined
      </h1>
      <button className="m-auto border-4 border-black font-bold px-20 py-5 rounded-lg">
        <Link to="/consent" className="flex items-center">
          Login
          <Logo className="ml-20 h-60" />
        </Link>
      </button>
    </section>
  </Layout>
);

export default Home;
