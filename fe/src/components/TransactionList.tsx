import React from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Icon } from '../assets/icons/payment.svg';

interface Props {
  data: any;
}

const labels = [
  {
    name: 'flow1',
    id: 1,
  },
  {
    name: 'flow2',
    id: 2,
  },
  {
    name: 'flow3',
    id: 3,
  },
];

const TransactionList: React.FC<Props> = ({ data }) => (
  <div>
    <h2 className="my-10 text-30 font-heading">Transactions</h2>
    <ul className="py-20">
      {data.map((transaction: any) => (
        <li key={transaction.id}>
          <Link
            to={`/transaction/${transaction.id}`}
            className="flex p-10 rounded-md items-start hover:bg-greylight"
          >
            <div className="bg-black p-10 rounded-full">
              <Icon className="fill-current text-white w-20 h-20" />
            </div>
            <div className="ml-20 leading-none">
              <div className="text-20">{transaction.name}</div>
              <div className="text-grey mt-5 text-14">{transaction.date}</div>
              <div className="flex mt-10">
                <div className="text-13 font-bold text-blue py-5 mr-10 rounded-full">
                  <Link to={`/transaction/${transaction.id}`}>Edit flow</Link>
                </div>
                {labels.map((flow) => (
                  <Link to={`/flow/${flow.id}`}>
                    <div
                      key={flow.id}
                      className="text-13 font-bold bg-pink py-5 px-10 mr-10 rounded-full"
                    >
                      {flow.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-auto pr-20">{`${transaction.amount.value} ${transaction.amount.currency}`}</div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionList;
