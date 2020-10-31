import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { AuthContext } from '../context/AuthContext';

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const {
    auth: { token },
  } = useContext(AuthContext);

  const handleSignout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-greylight">
      <div className="flex flex-col mx-auto w-full max-w-80rem bg-white">
        <header>
          <nav className="px-40 py-20 flex items-start">
            <Link to="/" className="text-22 font-logoHeading">
              IfPayThenPay
            </Link>
            {token && (
              <button className="ml-auto" onClick={handleSignout}>
                Sign out
              </button>
            )}
          </nav>
        </header>
        <main className="flex-1 py-20 px-40">{children}</main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
