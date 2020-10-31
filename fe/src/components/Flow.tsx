import React, { useRef, useState } from 'react';
import { ReactComponent as Icon } from '../assets/icons/drag.svg';
import { Container, Draggable } from "react-smooth-dnd";
import ConditionModal from './ConditionModal';
import ActionsModal from './ActionsModal';
import useClickOutside from '../utils/useClickOutside';
import { FlowState } from '../interfaces/FlowState';

interface Props {
}

enum ModalType {
  CONDITIONS = "CONDITIONS",
  ACTIONS = "ACTIONS"
}

const AmountConditionToConditionTypes = {
  "LESS_THAN": "less than",
  "LESS_THAN_OR_EQUAL": "less or equal than",
  "MORE_THAN": "more than to",
  "MORE_THAN_OR_EQUAL": "more or equal than",
  "EQUAL": "equal than" 
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

const Flow: React.FC<Props> = () => {
  const [modal, setModal] = useState<ModalType | null>(null);
  const [flowState, setFlowState] = useState<FlowState>({
    title: "",
    from: "",
    to: "",
    amount: "",
    amountCond: "",
    category: "",
    priority: 0,
    actions: [],
  })

  const ref = useRef<any>(null)

  const handleCloseModal = () => setModal(null);

  useClickOutside(ref, () => handleCloseModal)

  const handleDrop = () => {}

  return(
    <>
      <div>
        <div className="bg-greylight p-20 rounded-lg mb-40">
        <div className="flex items-center">
            <h2 className="py-10 text-20 text-grey uppercase font-heading">
              Conditions
            </h2>
            <button className="ml-auto text-blue font-heading" onClick={() => setModal(ModalType.CONDITIONS)}>+ Add condition</button>
          </div>
          <ul>
              {/* @ts-ignore */}
              {Object.keys(flowState).filter(i => (i !== "amountCond" && i !== "actions" && flowState[i])).map((condition) => (
                <li
                  key={condition}
                  className="handler border-2 flex flex-col border-grey-300 rounded-lg my-10 font-heading overflow-hidden"
                >
                  {/* @ts-ignore */}
                  <div className="bg-greylight px-20 py-10">IF: <span className="text-green capitalize">{`${condition} ${condition === "amount" ? ` ${AmountConditionToConditionTypes[flowState.amountCond]}` : ""}`}</span></div>
                  {/* @ts-ignore */}
                    <div className="bg-white px-20 py-20">{flowState[condition]}</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-greylight p-20 rounded-lg">
          <div className="flex items-center">
            <h2 className="py-10 text-20 text-grey uppercase font-heading">
              Actions
            </h2>
            <button className="ml-auto text-blue font-heading" onClick={() => setModal(ModalType.ACTIONS)}>+ Add action</button>
          </div>
          <ul>
            <Container
              dragHandleSelector=".handler"
              dropPlaceholder
              onDrop={handleDrop}
            >
              {actions.map((action) => (
                <Draggable key={action.id}>
                  <li
                    className="flex flex-col border-2 border-grey-300 rounded-lg my-10 font-heading overflow-hidden"
                  >
                    <div className="bg-greylight px-20 py-10">IF: <span className="text-green">{action.name}</span></div>
                    <div className="bg-white px-20 py-20 flex">
                      <div>Neco</div>
                      <div className="ml-auto bg-greylight rounded-full mr-20 handler cursor-move">
                        <Icon className="w-30 h-30 fill-current text-grey" />
                      </div>
                    </div>
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
              <ConditionModal close={handleCloseModal} value={flowState} onChange={setFlowState}/> : <ActionsModal close={handleCloseModal} value={flowState} onChange={setFlowState}/>
            }  
          </div>
        </div>
      )}
  </>
)};

export default Flow;
