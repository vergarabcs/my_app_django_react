import styled from "styled-components";
import COLORS from "../js/constants/colors";
import { ILetter } from "../types";

const COLORS_WF = COLORS.WORD_FACTORY;

export const Wrapper = styled.div`
  height: 60vmin;
  width: 60vmin;
  background-color: #eafaf1;
`

export const BoardWrapper = styled.div`
  display:grid;
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${COLORS_WF.BOARD};
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  border: solid 2px black;
`

export const HOVER_BEHAVIOR = `
  :hover {
    background-color: ${COLORS_WF.HOVER};
  }
`

export const PRESS_BEHAVIOR = `
  :active {
    background-color: ${COLORS.BUTTONS.PRESS};
  }
`

export const Letter = styled.div<ILetter>`
  background-color: ${({isSelected}) => isSelected? COLORS_WF.CUBE_SELECTED : COLORS_WF.CUBE};
  font-size: 5vmin;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: space-around;
  user-select: none;
  border: solid 2px black;
  
  ${HOVER_BEHAVIOR}
  ${PRESS_BEHAVIOR}
`

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`

export const AppBar = styled.div`
  height: 50px;
  background-color: ${COLORS.APP_BAR.BG_COLOR};
  border-bottom: solid 1px ${COLORS.BORDER_COLOR};
`

export const AppContent = styled.div`
  flex-grow: 1;
`