import React from 'react'

interface Props {
  data: any
  order: number
  onChange: (order: number) => void
}

const AccountList: React.FC<Props> = ({data, order, onChange}) => {

  return(
      <div className="mb-60">
        <h2 className="text-30 font-heading">Accounts</h2>
        <ul className="flex my-20">
          {data.map((account: any, index: number) => (
            <li key={account.id} className={`cursor-pointer bg-greylight p-20 rounded-lg mr-20 border-2 border-transparent ${order === index ? "border-black" : "opacity-75"}`} onClick={() => onChange(index)}>
              <div className="uppercase font-heading">{account.product}</div>
              <div className="text-13 text-grey">{account.name}</div>
              <div className="text-13 text-grey font-medium">{`${account.balance.amount.value} ${account.balance.amount.currency}`}</div>
            </li>
          ))}
        </ul>
      </div>
  )
};

export default AccountList;