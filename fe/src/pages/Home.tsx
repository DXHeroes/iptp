import React from 'react';
import Layout from '../components/Layout';
import { ReactComponent as Logo } from '../assets/icons/bankID.svg';
import { Link } from '@reach/router';

interface Props {}

const Home: React.FC<Props> = () => (
  <Layout>
    <section className="pt-100 flex flex-col">
      <h1 className="text-center mb-20 text-40 font-heading leading-normal">
        Manage payments
        <br /> of tomorrow
      </h1>
      <button className="mx-auto bg-blue text-white font-bold px-20 py-10 rounded-lg">
        <Link to="/consent" className="flex items-center">
          Login Bank ID
        </Link>
      </button>
    </section>
  </Layout>
);

export default Home;
