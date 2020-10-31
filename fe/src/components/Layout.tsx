import { Link } from '@reach/router';
import React from 'react';

interface Props {}

const Layout: React.FC<Props> = ({ children }) => (
  <div className="flex min-h-screen bg-greylight">
    <div className="flex flex-col mx-auto w-full max-w-80rem bg-white">
      <header>
        <nav className="px-40 py-20">
          <Link to="/" className="text-22 font-logoHeading">
            IfPayThenPay
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-20 px-40">{children}</main>
      <footer></footer>
    </div>
  </div>
);

export default Layout;
