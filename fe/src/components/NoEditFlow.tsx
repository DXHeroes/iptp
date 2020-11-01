//@ts-nocheck
import React from 'react';

interface Props {
  data: any;
}

const formList: any = {
  '01234/1234': 'Applifting s.r.o',
  '953437/9990': 'Goldman sachs',
};

const AmountConditionToConditionTypes = {
  LESS_THAN: 'less than',
  LESS_THAN_OR_EQUAL: 'less or equal than',
  MORE_THAN: 'more than to',
  MORE_THAN_OR_EQUAL: 'more or equal than',
  EQUAL: 'equal',
};

const NoEditFlow: React.FC<Props> = ({ data }) => {
  const getConditionName = (condition: any) => {
    let name;
    if (condition === 'amount') {
      name = `Amount ${AmountConditionToConditionTypes[data.amountCond]}`;
    } else {
      name = condition;
    }
    return name;
  };

  const getConditionValue = (condition: any) => {
    let name = condition;
    if (condition === 'from' || condition === 'to') {
      name = formList[data[condition]] || data[condition];
    } else if (condition === 'amount') {
      name = `${data[name]} CZK`;
    } else {
      name = data[name];
    }
    return name;
  };

  const getActionName = (action: any) => {
    let name;
    if (action.tsTo) {
      name = 'Create transaction';
    } else if (action.notification) {
      name = 'Set notification';
    }
    return name;
  };

  const getActionValue = (action: any) => {
    let value;
    if (action.tsTo) {
      value = `Send ${action.tsAmount} CZK to ${
        formList[action.tsTo] || action.tsTo
      } with VS ${action.tsVS}`;
    } else if (action.notification) {
      value = action.notification ? 'enabled' : 'disabled';
    }
    return value;
  };

  return (
    <div>
      <h1 className="mb-40 text-40 font-heading">{data.title}</h1>
      <div className="bg-greylight p-20 rounded-lg mb-40">
        <h2 className="py-10 text-20 text-grey uppercase font-heading">
          Conditions
        </h2>
        <ul>
          {Object.keys(data)
            .filter(
              (a) =>
                data[a] &&
                a !== 'actions' &&
                a !== 'amountCond' &&
                a !== 'date' &&
                a !== 'createdAt' &&
                a !== 'id' &&
                a !== 'userId' &&
                a !== 'updatedAt' &&
                a !== 'title' &&
                a !== 'priority'
            )
            .map((condition) => (
              <li className="flex flex-col border-2 border-grey-300 rounded-lg my-10 font-heading overflow-hidden">
                <div className="bg-greylight px-20 py-10">
                  <span className="text-green">
                    {getConditionName(condition)}
                  </span>
                </div>
                <div className="bg-white px-20 py-20 flex">
                  <div>{getConditionValue(condition)}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="bg-greylight p-20 rounded-lg mb-40">
        <h2 className="py-10 text-20 text-grey uppercase font-heading">
          Actions
        </h2>
        <ul>
          {data.actions?.map((action) => (
            <li className="flex flex-col border-2 border-grey-300 rounded-lg my-10 font-heading overflow-hidden">
              <div className="bg-greylight px-20 py-10">
                <span className="text-green">{getActionName(action)}</span>
              </div>
              <div className="bg-white px-20 py-20 flex">
                <div>{getActionValue(action)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoEditFlow;
