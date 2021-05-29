import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handleBackSpace, handleLetter, handleSubmit } from "../../redux/wordFactory/actions";
import { HOVER_BEHAVIOR, PRESS_BEHAVIOR, Wrapper } from "../../styles/styles";
import { RootState, WFState } from "../../types";
import COLORS from "../constants/colors";
import { isAlpha } from "../utils";
import { Board } from "./Board";
import { WordList } from "./WordList";


export const getWord = (wfState: WFState) => {
  const wordList = [];
  for(const coord of wfState.selectOrderList){
    const i = coord[0];
    const j = coord[1];
    const letter = wfState.boardModel[i][j].letter;
    wordList.push(letter);
  }
  return wordList.join("");
}

const Temp = styled.div`
  width: 60vmin;
  height: 70vmin;
  display: flex;
  flex-direction: column;
`

const Temp1 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
`

const InputController = styled.div`
  display: flex;
  height: 10vmin;
`

const ButtonBase = styled.div`
  display: flex;
  line-height: 10vmin;
  justify-content: space-around;
  width: 10vmin;
  user-select: none;
  font-size: 2.5vmin;
  border-radius: 10px;

  ${HOVER_BEHAVIOR}
  ${PRESS_BEHAVIOR}
`

const EraseButton = styled(ButtonBase)`
  background-color: ${COLORS.BUTTONS.ERASE};
`

const SubmitButton = styled(ButtonBase)`
  background-color: ${COLORS.BUTTONS.SUBMIT};
`

const TextBox = styled.input`
  flex-grow: 1;
  background-color: rgb(230, 230, 230);
  line-height: 10vmin;
  font-size: 2.5vmin;
  display: flex;
  justify-content: space-around;
  text-align: center;
`

const WordFactory = () => {
  const dispatch = useDispatch();
  const wFstate = useSelector((state: RootState) => state.wfState);

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onKeyPress', e.key);
    if(e.key === "Backspace"){
      dispatch(handleBackSpace());
    };
    if(isAlpha(e.key)){
      dispatch(handleLetter(e.key));
    }
    if(e.key === 'Enter'){
      dispatch(handleSubmit());
    }
  }

  return (
    <Temp1>
      <Temp>
        <InputController>
          <EraseButton onClick={() => dispatch(handleBackSpace())}>Erase</EraseButton>
          <TextBox
            value={getWord(wFstate)}
            type="text"
            onKeyDown={(e) => onKeyPress(e)}
          />
          <SubmitButton>Submit</SubmitButton>
        </InputController>
        <Wrapper>
          <Board/>
        </Wrapper>
      </Temp>
      <WordList/>
    </Temp1>
  );
};

export default WordFactory;