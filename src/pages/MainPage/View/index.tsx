import { NextSeo } from 'next-seo'
import { Page } from 'src/pages/_App/interfaces'
import {
  MouseEvent,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import {
  Game15PageBoardCellStyled,
  Game15PageBoardStyled,
  Game15PageStyled,
} from './styles'
import {
  boardGetValue,
  boardSetValue,
  boardSetValueByIndex,
  getNearestEmptyCell,
} from './helpers'

export type Cell = number | null

export type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell]
]

export type CellCoords = [number, number]

type State = {
  board: Board | undefined
}

export const Game15Page: Page = () => {
  const initialState = useMemo((): State => {
    return {
      board: undefined,
    }
  }, [])

  /**
   * Функция изменения состояния компонента
   */
  const reducer = useCallback<
    Reducer<
      State,
      // Инициализация новой игры
      | {
          key: 'init'
        }
      // Выбираем ячейку
      | {
          key: 'moveCell'
          coords: CellCoords
        }
    >
  >((state, action) => {
    const newState: State = { ...state }

    switch (action.key) {
      case 'init':
        /**
         * Задаем рандомный массив чисел
         */
        {
          const board: Board = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
          ]

          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

          let index = 1
          while (numbers.length) {
            //
            const randomIndex = Math.round(Math.random() * (numbers.length - 1))

            const number = numbers.splice(randomIndex, 1)[0]

            boardSetValueByIndex(board, index, number)

            index++
          }

          newState.board = board
        }
        break

      case 'moveCell':
        {
          if (newState.board) {
            newState.board = [...newState.board]

            const { coords } = action

            const cell = getNearestEmptyCell(newState.board, coords)

            /**
             * Если мы получили пустую ячейку, меняем их значения местами
             */
            if (cell) {
              const cellValue = boardGetValue(
                newState.board,
                coords[0],
                coords[1]
              )

              if (cellValue !== undefined) {
                // Пустой ячейке задаем новое значение
                boardSetValue(newState.board, cell, cellValue)

                // А текущую делаем пустой
                boardSetValue(newState.board, coords, null)
              }
            }
          }
        }

        break
    }

    return newState
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      key: 'init',
    })
  }, [])

  const { board } = state

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!board) {
        return
      }

      const value = event.currentTarget.value

      const [row, cell] = value.split(',')
      const coords: CellCoords = [parseInt(row), parseInt(cell)]

      dispatch({
        key: 'moveCell',
        coords,
      })
    },
    [board]
  )

  const boardContent = useMemo(() => {
    return (
      <Game15PageBoardStyled>
        {board?.map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            const emptyCell = getNearestEmptyCell(board, [
              rowIndex + 1,
              cellIndex + 1,
            ])

            const moveable = !!emptyCell

            return (
              <Game15PageBoardCellStyled
                key={`${rowIndex}-${cellIndex}`}
                value={[rowIndex + 1, cellIndex + 1].join()}
                moveable={moveable}
                onClick={moveable ? onClick : undefined}
              >
                {cell}
              </Game15PageBoardCellStyled>
            )
          })
        })}
      </Game15PageBoardStyled>
    )
  }, [board, onClick])

  const init = useCallback(() => {
    dispatch({
      key: 'init',
    })
  }, [])

  return (
    <>
      <NextSeo title="Урок 5. Пятнашки" />

      <Game15PageStyled>
        <div className="toolbar">
          <button onClick={init}>Перемешать</button>
        </div>

        {boardContent}
      </Game15PageStyled>
    </>
  )
}
