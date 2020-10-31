import React, { useRef, useState } from 'react';
import { ReactComponent as Icon } from '../assets/icons/drag.svg';
import { Container, Draggable } from "react-smooth-dnd";
import ConditionModal from './ConditionModal';
import ActionsModal from './ActionsModal';
import useClickOutside from '../utils/useClickOutside';

interface Props {
}

enum ModalType {
  CONDITIONS = "CONDITIONS",
  ACTIONS = "ACTIONS"
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

const conditions = [
  {
    id: 1,
    name: "From"
  },
  {
    id: 2,
    name: "To"
  },
]

const Flow: React.FC<Props> = () => {
  const [modal, setModal] = useState<ModalType | null>(null);
  const ref = useRef<any>(null)

  useClickOutside(ref, () => setModal(null))

  const handleDrop = () => {}

  return(
    <>
      <div>
        <div className="bg-greylight p-20 rounded-lg mb-40">
          <h2 className="py-10 text-20 text-grey uppercase font-heading">
            Conditions
          </h2>
          <ul>
              <button className="text-blue font-heading" onClick={() => setModal(ModalType.CONDITIONS)}>+ Add Filter</button>
              {conditions.map((condition) => (
                <li
                  key={condition.id}
                  className="handler bg-blue flex items-center text-white rounded-lg my-10 px-20 py-10 font-heading"
                >
                  <div>{condition.name}</div>
                </li>
              ))}
          </ul>
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
              <button className="text-green font-heading" onClick={() => setModal(ModalType.ACTIONS)}>+ Add action</button>
              {actions.map((action) => (
                <Draggable key={action.id}>
                  <li
                    className="handler bg-green flex items-center text-white rounded-lg my-10 px-20 py-10 font-heading"
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
      </div>
      {modal && (
        <div className="fixed bg-black bg-opacity-75 z-10 top-0 left-0 w-full h-full flex">
          <div ref={ref} className="bg-white max-w-30rem w-full m-auto py-40 px-20 rounded-lg">
            {modal === ModalType.CONDITIONS ? 
              <ConditionModal/> : <ActionsModal/>
            }  
          </div>
        </div>
      )}
  </>
)};

export default Flow;

{/* <fieldset className="flex pb-10 mb-20 items-center">
<label className="w-100 text-grey">From</label>
<input
  className="ml-20 flex-1 p-10 rounded-lg focus:outline-none"
  placeholder="From"
/>
</fieldset> */}
