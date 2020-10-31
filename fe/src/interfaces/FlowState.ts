import { ActionState } from "./ActionState";

export interface FlowState {
  title: string;
  from: string;
  to: string;
  amount: string;
  amountCond: AmountCondition | string;
  category: string;
  priority: number;
  actions?: ActionState[];
}

export enum AmountCondition {
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  MORE_THAN = 'MORE_THAN',
  MORE_THAN_OR_EQUAL = 'MORE_THAN_OR_EQUAL',
  EQUAL = 'EQUAL',
}
