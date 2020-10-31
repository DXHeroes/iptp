import React from 'react';
import { ReactComponent as Icon } from '../assets/icons/drag.svg';
import { Container, Draggable } from "react-smooth-dnd";


interface Props {
  handleDrop: (e: any) => void;
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

const Flow: React.FC<Props> = ({handleDrop}) => (
  <form>
    <div className="bg-greylight p-20 rounded-lg mb-40">
      <h2 className="py-10 text-20 text-grey uppercase font-heading">
        Conditions
      </h2>
      <div className="mt-10">
        <fieldset className="flex pb-10 mb-20 items-center">
          <label className="w-100 text-grey">From</label>
          <input
            className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
            placeholder="From"
          />
        </fieldset>
        <fieldset className="flex pb-10 mb-20 items-center">
          <label className="w-100 text-grey">To</label>
          <input
            className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
            placeholder="From"
          />
        </fieldset>
        <fieldset className="flex pb-10 mb-20 items-center">
          <label className="w-100 text-grey">Amount</label>
          <input
            className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
            placeholder="From"
          />
        </fieldset>
        <fieldset className="flex pb-10 mb-20 items-center">
          <label className="w-100 text-grey">Date</label>
          <input
            className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
            placeholder="From"
          />
        </fieldset>
        <fieldset className="flex pb-10 mb-20 items-center">
          <label className="w-100 text-grey">Category</label>
          <input
            className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
            placeholder="From"
          />
        </fieldset>
      </div>
    </div>
    <div className="bg-greylight p-20 rounded-lg">
      <h2 className="py-10 text-20 text-grey uppercase font-heading">
        Actions
      </h2>
      <ul>
        <Container
          dragHandleSelector=".handler"
          dropPlaceholder
          onDrop={handleDrop}
        >
          <li className="text-blue font-heading">+ Add action</li>
          {actions.map((action) => (
            <Draggable key={action.id}>
              <li
                className="handler bg-blue flex items-center text-white rounded-lg my-10 px-20 py-10 font-heading"
              >
                <div className="bg-greylight rounded-full mr-20">
                  <Icon className="w-30 h-30 fill-current text-grey" />
                </div>
                <div>{action.name}</div>
              </li>
            </Draggable>
          ))}
        </Container>
      </ul>
    </div>
  </form>
);

export default Flow;
