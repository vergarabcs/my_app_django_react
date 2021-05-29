import { rootReducer } from "./js/App";

export interface ILetter{
  isSelected?: boolean;
}

export interface CBBoardData {
  rowI: number,
  colI: number,
  letter: string,
}

export interface IBoardModel {
  board: ICube[][];
  selectOrderList: number[][]; // n x 2 coordinate list;
}

export interface ICube {
  letter: string;
  selected?: boolean;
  lastSelected?: boolean;
}

export interface WFState {
  enteredWords: string[];
  boardModel: ICube[][];
  selectOrderList: number[][];
}

export interface IAction {
  type: string,
  payload: unknown
}

export type RootState = ReturnType<typeof rootReducer>;