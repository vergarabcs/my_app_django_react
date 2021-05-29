import { ADJ_OFFSET } from "../../js/constants/general";
import { ICube, WFState } from "../../types";

export const findWord = (word: string, board: ICube[][]): number[][] | undefined => {
  let coordList: undefined | number[][];
  const isVisited: boolean[][] = [];
  for(let i=0 ; i<board.length ; i++){
    isVisited.push([])
    for(let j=0 ; j<board.length ; j++){
      isVisited[i].push(false);
    }
  }
  for(let i=0 ; i<board.length ; i++){
    for(let j=0 ; j<board.length ; j++){
      coordList = dfs([[i, j]], board, word, isVisited);
      if(coordList) return coordList;
    }
  }
  return undefined;
}
function dfs(coordList: number[][], board: ICube[][], word: string, isVisited: boolean[][]): number[][] | undefined {
  console.log('dfs');
  if(coordList.length <= 0) return undefined;
  const currI = coordList[coordList.length - 1][0];
  const currJ = coordList[coordList.length - 1][1];
  const correctLetter = word[coordList.length - 1];
  const currLetter = board[currI][currJ].letter;
  if(correctLetter !== currLetter) return undefined;
  if(coordList.length === word.length) return coordList;
  for(const offset of ADJ_OFFSET){
    const [offI, offJ] = offset;
    const newI = currI + offI;
    const newJ = currJ + offJ;

    //check bounds
    if(newI < 0 || newJ < 0 || newI >= board.length || newJ >= board.length) continue;
    //check if visited
    if(isVisited[newI][newJ]) continue;

    coordList.push([newI, newJ]);
    isVisited[newI][newJ] = true;
    const foundOrder = dfs(coordList, board, word, isVisited);
    if(foundOrder) return foundOrder;

    //unvisit if no found order
    coordList.pop();
    isVisited[newI][newJ] = false;
  }
  return undefined;
}

export function wFselect(newI: number, newJ: number, wFState: WFState) {
  if(wFState.selectOrderList.length > 0){
    const [lastI, lastJ] = wFState.selectOrderList[wFState.selectOrderList.length - 1];
    wFState.boardModel[lastI][lastJ].lastSelected = false;
  }
  wFState.boardModel[newI][newJ].lastSelected = true;
  wFState.boardModel[newI][newJ].selected = true;
  wFState.selectOrderList.push([newI, newJ]);
  return wFState;
}

export function wFResetSelect(wordCoord: number[][], wFState: WFState): any {
  for(let i=0 ; i<wFState.boardModel.length ; i++){
    for(let j=0 ; j<wFState.boardModel.length ; j++){
      wFState.boardModel[i][j].lastSelected = false;
      wFState.boardModel[i][j].selected = false;
    }
  }
  wFState.selectOrderList = wordCoord;

  for(const [newI, newJ] of wordCoord){
    wFState.boardModel[newI][newJ].selected = true;
  }

  const [lastI, lastJ] = wordCoord[wordCoord.length - 1];
  wFState.boardModel[lastI][lastJ].lastSelected = true;

  return wFState;
}

export function resetWfBoard(wFState: WFState): WFState {
  for(let i=0 ; i<wFState.boardModel.length ; i++){
    for(let j=0 ; j<wFState.boardModel.length ; j++){
      wFState.boardModel[i][j].lastSelected = false;
      wFState.boardModel[i][j].selected = false;
    }
  }
  wFState.selectOrderList = [];
  return wFState;
}