import React from 'react';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  submit?: boolean
}

const Button: React.FC<Props> = ({ children, onClick, submit }) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className="bg-black px-25 py-10 rounded-full text-white font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
