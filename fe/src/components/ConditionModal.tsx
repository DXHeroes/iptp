//@ts-nocheck
import React, { useState } from 'react';
import { AmountCondition, FlowState } from '../interfaces/FlowState';
import Button from './Button';

interface Props {
  value: FlowState;
  onChange: any;
  close: () => void;
}

enum ConditionTypes {
  FROM = 'from',
  TO = 'to',
  AMOUNT_MORE_THAN = 'amount more than',
  AMOUNT_MORE_EQUAL_THAN = 'amount more or equal than',
  AMOUNT_LESS_THAN = 'amount less than',
  AMOUNT_LESS_EQUAL_THAN = 'amount less or equal than',
  AMOUNT_EQUALS = 'amount equals',
  CATEGORY = 'category',
  DATE = 'date',
}

const categoryList = ['restaurant', 'transportation', 'travel', 'services'];

const fromList = [
  {
    num: '01234/1234',
    name: 'Applifting s.r.o',
  },
  {
    num: '953437/9990',
    name: 'Goldman sachs',
  },
];

const ConditionModal: React.FC<Props> = ({ value, onChange, close }) => {
  const [data, setData] = useState<{
    condition: ConditionTypes;
    value: any;
  }>({
    condition: ConditionTypes.FROM,
    value: '',
  });

  const [autocomplete, setAutocomplete] = useState(false);

  const setNumberFrom = (num: number) => {
    setData((state: any) => ({ ...state, value: num }));
    setAutocomplete(false);
  };

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setData((state) => ({
      ...state,
      condition: target.value as ConditionTypes,
      value: '',
    }));
  };

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({ ...state, value: target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.condition === ConditionTypes.AMOUNT_MORE_THAN) {
      onChange((state: any) => ({
        ...state,
        amount: `${data.value} CZK`,
        amountCond: AmountCondition.MORE_THAN,
      }));
    } else if (data.condition === ConditionTypes.AMOUNT_MORE_EQUAL_THAN) {
      onChange((state: any) => ({
        ...state,
        amount: `${data.value} CZK`,
        amountCond: AmountCondition.MORE_THAN_OR_EQUAL,
      }));
    } else if (data.condition === ConditionTypes.AMOUNT_LESS_THAN) {
      onChange((state: any) => ({
        ...state,
        amount: `${data.value} CZK`,
        amountCond: AmountCondition.LESS_THAN,
      }));
    } else if (data.condition === ConditionTypes.AMOUNT_LESS_EQUAL_THAN) {
      onChange((state: any) => ({
        ...state,
        amount: `${data.value} CZK`,
        amountCond: AmountCondition.LESS_THAN_OR_EQUAL,
      }));
    } else if (data.condition === ConditionTypes.AMOUNT_EQUALS) {
      onChange((state: any) => ({
        ...state,
        amount: `${data.value.toString()} CZK`,
        amountCond: AmountCondition.EQUAL,
      }));
    } else {
      onChange((state: any) => ({
        ...state,
        [data.condition]: data.value.toString(),
      }));
    }
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-40 font-heading text-30">Conditions</h3>
      <div className="bg-greylight p-20 cursor-pointer rounded-lg">
        <select
          className="w-full focus:outline-none cursor-pointer bg-greylight"
          onChange={handleSelect}
        >
          {Object.keys(ConditionTypes).map((condition) => (
            <option key={condition} value={ConditionTypes[condition]}>
              {ConditionTypes[condition]}
            </option>
          ))}
        </select>
      </div>
      {data.condition === ConditionTypes.FROM && (
        <div className="relative">
          <input
            onFocus={() => setAutocomplete(true)}
            required
            type="text"
            placeholder="Person..."
            value={data.value}
            onChange={handleInput}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
          {autocomplete && (
            <div className="rounded-md shadow-lg bg-white w-full absolute z-20">
              {fromList.map((fromItem) => (
                <div
                  key={fromItem.num}
                  className="p-20"
                  onClick={() => setNumberFrom(fromItem.num)}
                >
                  {fromItem.num}{' '}
                  <span className="text-grey">({fromItem.name})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {data.condition === ConditionTypes.TO && (
        <div className="relative">
          <input
            onFocus={() => setAutocomplete(true)}
            required
            type="text"
            placeholder="Person..."
            value={data.value}
            onChange={handleInput}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
          {autocomplete && (
            <div className="rounded-md shadow-lg bg-white w-full absolute z-20">
              {fromList.map((fromItem) => (
                <div
                  key={fromItem.num}
                  className="p-20"
                  onClick={() => setNumberFrom(fromItem.num)}
                >
                  {fromItem.num}{' '}
                  <span className="text-grey">({fromItem.name})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {data.condition === ConditionTypes.AMOUNT_MORE_EQUAL_THAN && (
        <input
          required
          type="number"
          placeholder="Amount in CZK..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      {data.condition === ConditionTypes.AMOUNT_MORE_THAN && (
        <input
          required
          type="number"
          placeholder="Amount in CZK..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      {data.condition === ConditionTypes.AMOUNT_LESS_EQUAL_THAN && (
        <input
          required
          type="number"
          placeholder="Amount in CZK..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      {data.condition === ConditionTypes.AMOUNT_LESS_THAN && (
        <input
          required
          type="number"
          placeholder="Amount in CZK..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      {data.condition === ConditionTypes.AMOUNT_EQUALS && (
        <input
          required
          type="number"
          placeholder="Amount in CZK..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      {data.condition === ConditionTypes.CATEGORY && (
        <div className="relative">
          <input
            onFocus={() => setAutocomplete(true)}
            required
            type="text"
            placeholder="Category..."
            value={data.value}
            onChange={handleInput}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
          {autocomplete && (
            <div className="rounded-md shadow-lg bg-white w-full absolute z-20">
              {categoryList.map((category) => (
                <div
                  key={category}
                  className="p-20"
                  onClick={() => setNumberFrom(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {data.condition === ConditionTypes.DATE && (
        <input
          required
          type="date"
          placeholder="Date..."
          value={data.value}
          onChange={handleInput}
          className="bg-greylight p-20 rounded-lg w-full mt-20"
        />
      )}
      <div className="flex justify-center mt-20">
        <Button submit>Add</Button>
      </div>
    </form>
  );
};

export default ConditionModal;
