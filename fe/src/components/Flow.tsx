import React, { useRef, useState } from 'react';
import { ReactComponent as Icon } from '../assets/icons/drag.svg';
import { Container, Draggable } from "react-smooth-dnd";
import ConditionModal from './ConditionModal';
import ActionsModal from './ActionsModal';
import useClickOutside from '../utils/useClickOutside';
import { AmountCondition, FlowState } from '../interfaces/FlowState';
import { ActionState } from '../interfaces/ActionState';
import Button from './Button';
import { createFlow } from '../utils/api';

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

const Flow: React.FC<Props> = () => {
  const [modal, setModal] = useState<ModalType | null>(null);
  const [flowState, setFlowState] = useState<FlowState>({
    title: "",
    from: "",
    to: "",
    amount: "",
    amountCond: AmountCondition.EQUAL,
    category: "",
    priority: 0,
    date: "",
    actions: [],
  })

  const ref = useRef<any>(null)

  const handleCloseModal = () => setModal(null);

  useClickOutside(ref, handleCloseModal)

  const getActionName = (action: ActionState) => {
    let text;

    if (action.notification) {
      text = "Enable notification"  
    }
    else if (action.tag) {
      text = "Create tag"  
    }
    else if (action.tsTo) {
      text = "Send transaction"  
    }
    return text
  }

  const getActionValue = (action: ActionState) => {
    let value;

    if (action.notification) {
      value = action.notification ? "enabled" : "disabled"
    }
    else if (action.tag) {
      value = action.tag  
    }
    else if (action.tsTo) {
      value = "Send " + (action.tsAmount ? `${action.tsAmount} CZK` : "") + (action.tsTo ? ` to ${action.tsAmount}` : "") + (action.tsVS ? ` with VS number ${action.tsVS}` : "")
    }
    return value
  }

  const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => setFlowState(state => ({...state, title: target.value}))

  const handleDrop = ({removedIndex, addedIndex}: any) => {
    if (removedIndex === addedIndex) return;
    //@ts-ignore
    const actions = [...flowState.actions];
    const picked = actions.splice(removedIndex, 1)[0];
    actions.splice(addedIndex, 0, picked);
    setFlowState(state => ({...state, actions}))
  }

  const handleCreateFlow = async () => {
    //@ts-ignore;
    flowState.actions = flowState.actions?.map((a, index) => ({...a, priority: index}))
    const res = await createFlow(flowState);
    console.log(res)
  }

  return(
    <>
      <div>
        <input className="p-20 bg-greylight w-full mb-40" placeholder="Title..." value={flowState.title} onChange={handleInput}/>
        <div className="bg-greylight p-20 rounded-lg mb-40">
        <div className="flex items-center">
            <h2 className="py-10 text-20 text-grey uppercase font-heading">
              Conditions
            </h2>
            <button className="ml-auto text-blue font-heading" onClick={() => setModal(ModalType.CONDITIONS)}>+ Add condition</button>
          </div>
          <ul>
              {/* @ts-ignore */}
              {Object.keys(flowState).filter(i => (i !== "title" && i !== "amountCond" && i !== "actions" && flowState[i])).map((condition) => (
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
              {flowState.actions?.map((action: any, index: number) => (
                <Draggable key={index}>
                  <li
                    className="flex flex-col border-2 border-grey-300 rounded-lg my-10 font-heading overflow-hidden"
                  >
                    <div className="bg-greylight px-20 py-10"><span className="text-green">{getActionName(action)}</span></div>
                    <div className="bg-white px-20 py-20 flex">
                      <div>{getActionValue(action)}</div>
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
        <div className="mt-20 flex justify-center" onClick={handleCreateFlow}>
            <Button>Create flow</Button>
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
