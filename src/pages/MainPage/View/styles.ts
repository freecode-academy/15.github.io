import styled, { css } from 'styled-components'

type Game15PageBoardCellStyledProps = {
  // Может быть перемещена
  moveable: boolean
}

export const Game15PageBoardCellStyled = styled.button<Game15PageBoardCellStyledProps>`
  border: 1px solid #ddd;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 2px 2px #d7cece;
  cursor: default;

  ${({ moveable }) => {
    if (moveable) {
      return css`
        cursor: pointer;
        background-color: #d5d4d4;

        &:hover {
          background-color: #cbc9c9;
        }
      `
    }
  }}
`

export const Game15PageBoardStyled = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`

export const Game15PageStyled = styled.div`
  .toolbar {
    margin: 15px 0;

    button {
      cursor: pointer;
    }
  }
`
