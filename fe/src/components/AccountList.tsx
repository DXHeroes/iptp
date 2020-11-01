import React from 'react';

interface Props {
  data: any;
  order: number;
  onChange: (order: number) => void;
}

const bankLogos = [
  'https://www.banky.cz/Up/1/tn-w500-539px-ceska_sporitelnasvg1.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Komer%C4%8Dn%C3%AD_banka_logo.svg/1280px-Komer%C4%8Dn%C3%AD_banka_logo.svg.png',
];

const AccountList: React.FC<Props> = ({ data, order, onChange }) => {
  return (
    <div className="mb-60">
      <h2 className="text-30 font-heading">Accounts</h2>
      <ul className="flex my-20">
        {data.map((account: any, index: number) => (
          <li
            key={account.id}
            className={`flex cursor-pointer bg-greylight p-20 rounded-lg mr-20 border-2 border-transparent ${
              order === index ? 'border-black' : 'opacity-75'
            }`}
            onClick={() => onChange(index)}
          >
            <div>
              <img className="w-60 mr-20" src={bankLogos[index]} alt="bank" />
            </div>
            <div>
              <div className="uppercase font-heading">{account.product}</div>
              <div className="text-13 text-grey">{account.name}</div>
              <div className="text-13 text-grey font-medium">{`${account.balance} ${account.currency}`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
