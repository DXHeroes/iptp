import React, { useEffect } from 'react';

interface Props {}

const AuthRedirect: React.FC<Props> = () => {
  const token = window.location?.hash.replace('access_token=', '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/';
    }
  }, []);

  return <div>Loading...</div>;
};

export default AuthRedirect;
