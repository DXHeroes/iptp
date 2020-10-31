import React from 'react'

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


const ActionsModal: React.FC<Props> = () => (
  <>
    <h3 className="mb-40 font-heading text-30">Action</h3>
    <div className="bg-greylight p-20 cursor-pointer">
      <select className="w-full focus:outline-none bg-greylight">
        {actions.map(action => (
          <option value={action.id}>{action.name}</option>
        ))}
      </select>
    </div>
  </>
);

export default ActionsModal;