import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardWrapper, Letter } from "../../styles/styles";
import { ICube, RootState } from "../../types";
import { SET_STATE } from "../constants/general";

const canBeSelected = (rowI: number, colI: number, boardModel: ICube[][]): boolean => {
  // bound check
  if(rowI < 0 || colI < 0 || rowI >= boardModel.length || colI >= boardModel.length) return false;

  console.log('bill boundPassed')
  // isSelected check
  if(boardModel[rowI][colI].selected) return false;

  console.log('bill not yet selected')
  // check if adjacent to last selected
  const {lastRowI, lastColI} = getLastSelectedCoord(boardModel);
  if(lastRowI === -1) return true; // none selected

  console.log('bill none selected yet')
  const d = Math.abs(rowI - lastRowI) + Math.abs(colI - lastColI)
  if(d === 1) return true;

  console.log('bill adjacency test failed');
  return false
}

export const Board: FC = () => {
  const dispatch = useDispatch();
  const wfState = useSelector((state: RootState) => state.wfState);
  console.log('bill Board', wfState);
  const selectOrderList = wfState.selectOrderList;
  const board = wfState.boardModel;

  const onClick = (rowI: number, colI: number) => {
    console.log('bill onClick');
    if(!canBeSelected(rowI, colI, board)) return;
    console.log('selected');
    board[rowI][colI].selected = true;
    const lastRowI = selectOrderList[selectOrderList.length - 1]?.[0] ?? -1;
    const lastColI = selectOrderList[selectOrderList.length - 1]?.[1] ?? -1;
    selectOrderList.push([rowI, colI]);
    if(lastRowI !== -1){
      board[lastRowI][lastColI].lastSelected = false;
    }
    board[rowI][colI].lastSelected = true;
    dispatch({
      type: SET_STATE,
      payload: {
        ...wfState,
        selectOrderList: selectOrderList,
        boardModel: board
      }
    })
  }

  const temp1 = [];
  for(let i=0 ; i<board.length ; i++){
    for(let j=0 ; j<board[0].length ; j++){
      console.log('bill pushed')
      temp1.push(
        <Letter onClick={() => onClick(i, j)} isSelected={board[i][j].selected}>
          <div>
            {board[i][j].letter}
          </div>
        </Letter>
      );
    }
  }

  return (
    <BoardWrapper>
      {temp1}
    </BoardWrapper>
  );
}

function getLastSelectedCoord(boardModel: ICube[][]): { lastRowI: number; lastColI: number; } {
  for(let i=0 ; i< boardModel.length; i++){
    for(let j=0 ; j<boardModel.length; j++){
      if(boardModel[i][j].lastSelected){
        return {
          lastRowI: i,
          lastColI: j
        }
      }
    }
  }

  return {
    lastRowI: -1,
    lastColI: -1
  }
}

