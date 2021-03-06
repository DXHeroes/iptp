import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import { ReactComponent as Icon } from '../assets/icons/payment.svg';

interface Props {
  data: any;
}

const formList: any = {
  '01234/1234': 'Applifting s.r.o',
  '953437/9990': 'Goldman sachs',
};

const getTransactionName = (ts: string) => {
  let name;
  if (formList[ts]) {
    name = formList[ts];
  } else {
    name = ts || 'Prokop';
  }
  return name;
};

const TransactionList: React.FC<Props> = ({ data }) => (
  <div>
    <h2 className="my-10 text-30 font-heading">Transactions</h2>
    <ul className="py-20">
      {data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((transaction: any) => (
          <li
            key={transaction.id}
            className="flex p-10 rounded-md items-start hover:bg-greylight"
          >
            <div className="bg-black p-10 rounded-full">
              <Icon className="fill-current text-white w-20 h-20" />
            </div>
            <div className="ml-20 leading-none">
              <div className="text-20">
                {`${getTransactionName(
                  transaction.fromName
                )} to ${getTransactionName(transaction.toName)}`}
              </div>
              <div className="text-grey mt-5 text-14">
                {moment(transaction.date).format('D MMM YYYY, HH:mm ')}
              </div>
              <div className="flex mt-10">
                {transaction.tags?.map((tag: string) => (
                  <Link key={tag} to={`/flow/${tag}`}>
                    <div className="text-13 font-medium text-white bg-blue py-5 px-10 mr-10 rounded-full">
                      {tag}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-auto pr-20">{`${transaction.amount.value} ${transaction.amount.currency}`}</div>
          </li>
        ))}
    </ul>
  </div>
);

export default TransactionList;
