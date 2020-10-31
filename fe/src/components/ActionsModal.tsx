import React, { useState } from 'react'
import { AmountCondition, FlowState } from '../interfaces/FlowState';
import Button from './Button';

interface Props {
  value: FlowState
  onChange: any;
  close: () => void;
}

enum ConditionTypes {
  FROM = 'from',
  TO = "to",
  AMOUNT_MORE_THAN = "amount more than",
  AMOUNT_MORE_EQUAL_THAN = "amount more or equal than",
  AMOUNT_LESS_THAN = "amount less than",
  AMOUNT_LESS_EQUAL_THAN = "amount less or equal than",
  AMOUNT_EQUALS_THAN = "amount equals than",
  CATEGORY = "category",
  DATE = "date"
}

const ActionModal: React.FC<Props> = ({value, onChange}) => {
  const [data, setData] = useState<{
    condition: ConditionTypes,
    value: any;
  }>({
    condition: ConditionTypes.FROM,
    value: ""
  });

  const handleSelect = ({target}: React.ChangeEvent<HTMLSelectElement>) => {
    setData(state => ({...state, condition: target.value as ConditionTypes, value: ""}))
  }
  
  const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => setData((state: any) => ({...state, value: target.value }))

  const handleFilterAdded = () => {
    console.log("k")
    if (data.condition === ConditionTypes.AMOUNT_MORE_THAN) {
      onChange((state: any) => ({...state, amount: data.value.toString(), amountCond: AmountCondition.MORE_THAN})) 
    }
    else if (data.condition === ConditionTypes.AMOUNT_MORE_EQUAL_THAN) {
      onChange((state: any) => ({...state, amount: data.value.toString(), amountCond: AmountCondition.MORE_THAN_OR_EQUAL})) 
    }
    else if (data.condition === ConditionTypes.AMOUNT_LESS_THAN) {
      onChange((state: any) => ({...state, amount: data.value.toString(), amountCond: AmountCondition.LESS_THAN})) 
    }
    else if (data.condition === ConditionTypes.AMOUNT_LESS_EQUAL_THAN) {
      onChange((state: any) => ({...state, amount: data.value.toString(), amountCond: AmountCondition.LESS_THAN_OR_EQUAL})) 
    }
    else if (data.condition === ConditionTypes.AMOUNT_EQUALS_THAN) {
      onChange((state: any) => ({...state, amount: data.value.toString()})) 
    }
    else {
      onChange((state: any) => ({...state, [data.condition]: data.value.toString()})) 
    }
  }

  return(
    <>
      <h3 className="mb-40 font-heading text-30">Actions</h3>
      <div className="bg-greylight p-20 cursor-pointer rounded-lg">
        <select className="w-full focus:outline-none cursor-pointer bg-greylight" onChange={handleSelect}>
          {Object.keys(ConditionTypes).map(condition => (
            //@ts-ignore
            <option key={condition} value={ConditionTypes[condition]}>{ConditionTypes[condition]}</option>
          ))}
        </select>
      </div>
      {data.condition === ConditionTypes.FROM && (
        <input type="text" placeholder="Person..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.TO && (
        <input type="text" placeholder="Person..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.AMOUNT_MORE_EQUAL_THAN && (
        <input type="number" placeholder="Amount..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.AMOUNT_MORE_THAN && (
        <input type="number" placeholder="Amount..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.AMOUNT_LESS_EQUAL_THAN && (
        <input type="number" placeholder="Amount..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.AMOUNT_LESS_THAN && (
        <input type="number" placeholder="Amount..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.AMOUNT_EQUALS_THAN && (
        <input type="number" placeholder="Amount..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.CATEGORY && (
        <input type="text" placeholder="Category..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      {data.condition === ConditionTypes.DATE && (
        <input type="text" placeholder="Date..." value={data.value} onChange={handleInput} className="bg-greylight p-20 rounded-lg w-full mt-20"/>
      )}
      <div className="flex justify-center mt-20">
        <Button onClick={handleFilterAdded}>Add</Button>
      </div>
    </>
  );
}

export default ActionModal;