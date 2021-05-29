import { store } from "../../js/App"
import { getWord } from "../../js/components/WordFactory";
import { ADJ_OFFSET, SET_STATE } from "../../js/constants/general";
import { WFState } from "../../types";
import { findWord, resetWfBoard, wFResetSelect, wFselect } from "./utils";

export const handleSubmit = () => {
  const wFState = store.getState().wfState;
  const toSubmitWord = getWord(wFState);
  if(!toSubmitWord) return {type: ''};
  
  if(!wFState.enteredWords.includes(toSubmitWord)){
    wFState.enteredWords.push(toSubmitWord);
    //todo: submit to websocket
  }
  resetWfBoard(wFState);

  return {
    type: SET_STATE,
    payload: {
      ...wFState,
      enteredWords: [...wFState.enteredWords]
    }
  }
}
export const handleBackSpace = () => {
  const wFState = store.getState().wfState;
  const selected = [...wFState.selectOrderList];
  const last = selected.pop();
  if(!last) return;
  const lastI = last[0];
  const lastJ = last[1];
  
  const board = [
    ...wFState.boardModel
  ]
  board[lastI][lastJ].lastSelected = false;
  board[lastI][lastJ].selected = false;
  if(selected.length > 0){
    const newLastI = selected[selected.length - 1][0];
    const newLastJ = selected[selected.length - 1][1];
    board[newLastI][newLastJ].lastSelected = true;
  }

  return {
    type: SET_STATE,
    payload: {
      ...wFState,
      selectOrderList: selected,
      boardModel: board
    }
  }
}

// assumes letter is already validated
export const handleLetter = (letter: string) => {
  letter = letter.toUpperCase();
  const wFState = store.getState().wfState;

  const {newI, newJ} = getLetterCoord(letter, wFState);
  let newWFState;
  if(!newI || !newJ){
    // not in currently selected adjacents.
    const word = `${getWord(wFState)}${letter}`;
    const wordCoord = findWord(word, wFState.boardModel);
    if(!wordCoord) return {type: ''};
    newWFState = wFResetSelect(wordCoord, wFState);
  }else{
    newWFState = wFselect(newI, newJ, wFState);
  }
  return {
    type: SET_STATE,
    payload: {
      ...newWFState
    }
  }
}

function getLetterCoord(letter: string, wFState: WFState): { newI?: number; newJ?: number; } {
  let newI = -1;
  let newJ = -1;

  const selected = wFState.selectOrderList;
  if(selected.length === 0){
    return {}; // none found
  }
  // Getting here means there are already selected coord, get last selected and check Adjacent.
  const [lastI, lastJ] = selected[selected.length - 1];
    for(const [offI, offJ] of ADJ_OFFSET){
    newI = lastI + offI;
    newJ = lastJ + offJ;
    if(wFState.boardModel?.[newI]?.[newJ]?.selected) continue;
    const currLetter = wFState.boardModel?.[newI]?.[newJ]?.letter;
    console.log('adjCheck', {
      newI, newJ, letter, currLetter, lastI, lastJ, offI, offJ
    })
    if(currLetter === letter){
      return {
        newI,
        newJ
      }
    }
  }

  return {}; // none found
}

