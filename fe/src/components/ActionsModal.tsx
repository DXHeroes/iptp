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
  <div className="bg-white max-w-30rem w-full m-auto py-40 px-20 rounded-lg">
    <h3 className="mb-40 font-heading text-30">Action</h3>
    <div className="bg-greylight p-20 cursor-pointer">
      <select className="w-full focus:outline-none bg-greylight">
        {actions.map(action => (
          <option value={action.id}>{action.name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default ActionsModal;