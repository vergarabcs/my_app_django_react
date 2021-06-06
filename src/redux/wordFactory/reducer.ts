import { SET_STATE } from "../../js/constants/general";
import { IAction, ICube, WFState } from "../../types";

const temp = [
  'ABCDE'.split(""),
  'ABCDE'.split(""),
  'ABCDE'.split(""),
  'ABCDE'.split(""),
  'ABCDE'.split(""),
];

const BOARD_LETTERS: ICube[][] = temp.map((row) => (
  row.map((letter) => ({
    letter: letter
  }))
));

const initialState: WFState = {
  enteredWords: [],
  boardModel: BOARD_LETTERS,
  selectOrderList: [],
  score: 0
}

// Use the initialState as a default value
export default function wfReducer(state = initialState, action: IAction) {
  console.log('bill reducer', {
    initialState,
    action
  })
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        ...action.payload as {}
      }
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}

