import React, { ElementRef, ReactElement, ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../types';
import COLORS from '../constants/colors';

const WordListStyle = styled.div`
  background-color: ${COLORS.WORD_FACTORY.CUBE};
  width: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 70vmin;
  font-weight: bold;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 5px;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.WORD_FACTORY.BOARD};
    border-radius: 10px;
    opacity: 0.5;
  }
`

const WordStyle = styled.div`
  font-size: 2vmin;
  min-height: 6vmin;
  line-height: 6vmin;
  border: 1px solid black;
  padding-left: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
`

export const WordList = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const enteredWords = useSelector((state: RootState) => state.wfState.enteredWords);
  const wordElements: ReactNode[] =  [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    console.log('bill', enteredWords);
    scrollToBottom()
  }, [enteredWords]);

  for(let i=0 ; i<30 ; i++){
    wordElements.push(
      <WordStyle key={i}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}
      </WordStyle>
    );
  }

  for(let i=0 ; i<enteredWords.length ; i++){
    wordElements.push(
      <WordStyle key={i}>
        {enteredWords[i]}
      </WordStyle>
    );
  }

  return (
    <WordListStyle>
      {wordElements}
      <div ref={messagesEndRef} />
    </WordListStyle>
  );
}