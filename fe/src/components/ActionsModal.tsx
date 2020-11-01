//@ts-nocheck
import React, { useState } from 'react';
import { FlowState } from '../interfaces/FlowState';
import Button from './Button';

interface Props {
  value: FlowState;
  onChange: any;
  close: () => void;
}

enum ActionsTypes {
  TRANSACTION = 'transaction',
  CREATE_TAG = 'tag',
  ENABLE_NOTIFICATION = 'notification',
}

enum AutocompleteTypes {
  TO = 'to',
  TAG = 'tag',
}

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
const tagList = ['investment', 'family', 'entertainment', 'restaurants'];

const ActionModal: React.FC<Props> = ({ value, onChange, close }) => {
  const [data, setData] = useState<{
    action: ActionsTypes;
    value: {
      tag: string;
      tsTo: string;
      tsAmount: string;
      tsVS: string;
      notification: boolean;
    };
  }>({
    action: ActionsTypes.TRANSACTION,
    value: {
      tag: '',
      tsTo: '',
      tsAmount: '',
      tsVS: '',
      notification: false,
    },
  });
  const [autocomplete, setAutocomplete] = useState<AutocompleteTypes | null>(
    null
  );

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setData((state) => ({
      ...state,
      action: target.value as ActionsTypes,
      value: {
        tag: '',
        tsTo: '',
        tsAmount: '',
        tsVS: '',
        notification: false,
      },
    }));
  };

  const handleInputTo = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({
      ...state,
      value: { ...state.value, tsTo: target.value },
    }));
  const handleInputAmount = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({
      ...state,
      value: { ...state.value, tsAmount: target.value },
    }));
  const handleInputVS = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({
      ...state,
      value: { ...state.value, tsVS: target.value },
    }));
  const handleInputTag = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({
      ...state,
      value: { ...state.value, tag: target.value },
    }));
  const handleInputCheckbox = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setData((state: any) => ({
      ...state,
      value: { ...state.value, notification: target.checked },
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange((state: any) => ({
      ...state,
      actions: [
        ...state.actions,
        {
          ...data.value,
        },
      ],
    }));
    close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-40 font-heading text-30">Actions</h3>
      <div className="bg-greylight p-20 cursor-pointer rounded-lg">
        <select
          className="w-full focus:outline-none cursor-pointer bg-greylight"
          onChange={handleSelect}
        >
          {Object.keys(ActionsTypes).map((action) => (
            <option key={action} value={ActionsTypes[action]}>
              {ActionsTypes[action]}
            </option>
          ))}
        </select>
      </div>
      {data.action === ActionsTypes.TRANSACTION && (
        <div>
          <div className="relative">
            <input
              required
              type="text"
              placeholder="Transaction to..."
              onFocus={() => setAutocomplete(AutocompleteTypes.TO)}
              value={data.value.tsTo}
              onChange={handleInputTo}
              className="bg-greylight p-20 rounded-lg w-full mt-20"
            />
            {autocomplete === AutocompleteTypes.TO && (
              <div className="rounded-md shadow-lg bg-white w-full absolute z-20">
                {fromList.map((fromItem) => (
                  <div
                    key={fromItem.num}
                    className="p-20"
                    onClick={() => {
                      setData((state) => ({
                        ...state,
                        value: { ...state.value, tsTo: fromItem.num },
                      }));
                      setAutocomplete(null);
                    }}
                  >
                    {fromItem.num}{' '}
                    <span className="text-grey">({fromItem.name})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            required
            type="text"
            placeholder="Transaction amount in %..."
            value={data.value.tsAmount}
            max={100}
            onChange={handleInputAmount}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
          <input
            required
            type="number"
            placeholder="Transaction VS..."
            value={data.value.tsVS}
            onChange={handleInputVS}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
        </div>
      )}
      {data.action === ActionsTypes.CREATE_TAG && (
        <div className="relative">
          <input
            required
            type="text"
            placeholder="Create tag..."
            onFocus={() => setAutocomplete(AutocompleteTypes.TAG)}
            value={data.value.tag}
            onChange={handleInputTag}
            className="bg-greylight p-20 rounded-lg w-full mt-20"
          />
          {autocomplete === AutocompleteTypes.TAG && (
            <div className="rounded-md shadow-lg bg-white w-full absolute z-20">
              {tagList.map((a) => (
                <div
                  key={a}
                  className="p-20"
                  onClick={() => {
                    setData((state) => ({
                      ...state,
                      value: { ...state.value, tag: a },
                    }));
                    setAutocomplete(null);
                  }}
                >
                  {a}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {data.action === ActionsTypes.ENABLE_NOTIFICATION && (
        <label className="block mt-20 px-20">
          <input
            type="checkbox"
            checked={data.value.notification}
            onChange={handleInputCheckbox}
          />
          <span className="ml-10">Enable notification</span>
        </label>
      )}
      <div className="flex justify-center mt-20">
        <Button submit>Add</Button>
      </div>
    </form>
  );
};

export default ActionModal;
