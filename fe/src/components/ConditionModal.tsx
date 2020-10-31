import React from 'react'
import Button from './Button';

interface Props {

}

const actions = [
  {
    id: 1,
    name: 'TRANS',
    value: '',
  },
  {
    id: 2,
    name: 'SET LABEL',
  },
];


const ConditionModal: React.FC<Props> = () => (
  <>
    <h3 className="mb-40 font-heading text-30">Conditions</h3>
    <div className="bg-greylight p-20 cursor-pointer">
      <select className="w-full focus:outline-none bg-greylight">
        {actions.map(action => (
          <option value={action.id}>{action.name}</option>
        ))}
      </select>
    </div>
    <div className="flex justify-center mt-20">
      <Button>Add</Button>
    </div>
  </>
);

export default ConditionModal;