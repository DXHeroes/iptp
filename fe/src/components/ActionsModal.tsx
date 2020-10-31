import React, { useState } from 'react'
import { FlowState } from '../interfaces/FlowState';
import Button from './Button';

interface Props {
  value: FlowState
  onChange: any;
  close: () => void;
}

enum ActionsTypes {
  TRANSACTION = "transaction",
  CREATE_TAG = "tag",
  ENABLE_NOTIFICATION = "notification",
}

const ActionModal: React.FC<Props> = ({value, onChange, close}) => {
  const [data, setData] = useState<{
    action: ActionsTypes,
    value: {
      tag: string
      tsTo: string;
      tsAmount: string;
      tsVS: string;
      notification: boolean
    };
  }>({
    action: ActionsTypes.TRANSACTION,
    value: {
      tag: "",
      tsTo: "",
      tsAmount: "",
      tsVS: "",
      notification: false,
    }
  });

  const handleSelect = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    setData(state => ({...state, action: target.value as ActionsTypes, value: {
      tag: "",
      tsTo: "",
      tsAmount: "",
      tsVS: "",
      notification: false,
    }}))
  }
  
  const handleInputTo = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: {...state.value, tsTo: target.value} }))
  const handleInputAmount = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: {...state.value, tsAmount: target.value} }))
  const handleInputVS = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: {...state.value, tsVS: target.value} }))
  const handleInputTag = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: {...state.value, tag: target.value} }))
  const handleInputCheckbox = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: {...state.value, notification: target.checked} }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange((state: any)=> ({...state, actions: [...state.actions, {
      ...data.value
    }] }))
    close();
  }

  return(
    <form onSubmit={handleSubmit}>
      <h3 className="mb-40 font-heading text-30">Actions</h3>
      <div className="bg-greylight p-20 cursor-pointer rounded-lg">
        <select className="w-full focus:outline-none cursor-pointer bg-greylight" onChange={handleSelect}>
          {Object.keys(ActionsTypes).map(action => (
            //@ts-ignore
            <option key={action} value={ActionsTypes[action]}>{ActionsTypes[action]}</option>
          ))}
        </select>
      </div>
      {data.action === ActionsTypes.TRANSACTION && (
        <div>
          <input required type="text" placeholder="Transaction to..." value={data.value.tsTo} onChange={handleInputTo} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
          <input required type="number" placeholder="Transaction amount..." value={data.value.tsAmount} onChange={handleInputAmount} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
          <input required type="text" placeholder="Transaction VS..." value={data.value.tsVS} onChange={handleInputVS} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
        </div>
      )}
      {data.action === ActionsTypes.CREATE_TAG && (
        <input required type="text" placeholder="Create tag..." value={data.value.tag} onChange={handleInputTag} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.action === ActionsTypes.ENABLE_NOTIFICATION && (
        <label className="block mt-20 px-20">
          <input type="checkbox" checked={data.value.notification} onChange={handleInputCheckbox}/>
          <span className="ml-10">Enable notification</span>
        </label>
      )}
      <div className="flex justify-center mt-20">
        <Button submit>Add</Button>
      </div>
    </form>
  );
}

export default ActionModal;