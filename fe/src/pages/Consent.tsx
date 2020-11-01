import React from 'react';
import { ReactComponent as Logo } from '../assets/icons/bankID.svg';

interface Props {}

const Home: React.FC<Props> = () => (
  <div className="min-h-screen flex flex-col w-full bg-greylight">
    <header className="bg-white border-b-2 border-grey-300 w-full px-20 py-10">
      <nav className="mx-auto max-w-80rem w-full">
        <Logo className="h-60" />
      </nav>
    </header>
    <div className="flex-1 flex">
      <button className="m-auto bg-blue text-white font-bold px-60 py-40 rounded-lg text-40">
        <a
          href="http://localhost:3000/api/auth/linkedin"
          className="flex items-center"
        >
          Approve
        </a>
      </button>
    </div>
  </div>
);

export default Home;
