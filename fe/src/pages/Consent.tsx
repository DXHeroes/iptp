import React from 'react';
import { ReactComponent as Logo } from '../assets/icons/bankID.svg';
import { UrlEnums } from '../utils/url.enum';

interface Props {}

const Home: React.FC<Props> = () => (
  <div className="min-h-screen flex flex-col w-full bg-greylight">
    <header className="bg-white border-b-2 border-grey-300 w-full px-20 py-10">
      <nav className="mx-auto max-w-80rem w-full">
        <Logo className="h-60" />
      </nav>
    </header>
    <div className="flex-1 flex">
      <button className="m-auto border-4 border-black font-bold px-60 py-20 rounded-lg text-60">
        <a
          href={`${UrlEnums.API_URL}/auth/linkedin`}
          className="flex items-center"
        >
          Login with
          <Logo className="ml-20 h-100" />
        </a>
      </button>
    </div>
  </div>
);

export default Home;
