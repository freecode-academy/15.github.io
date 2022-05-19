import { Board, CellCoords } from '.'

const getCellCoordsByIndex = (index: number): CellCoords => {
  const row = Math.ceil(index / 4)
  const col = ((index + 3) % 4) + 1

  return [row, col]
}

/**
 * Пытаемся получить ближайшую пустую ячейку
 */
export const getNearestEmptyCell = (
  board: Board,
  coords: CellCoords
): CellCoords | undefined => {
  const [row, col] = coords

  const nearestCellCoords: CellCoords[] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]

  const emptyCell = nearestCellCoords.find((n) => {
    const cell = boardGetValue(board, n[0], n[1])

    return cell === null
  })

  return emptyCell
}

export const boardSetValueByIndex = (
  board: Board,
  index: number,
  value: number | null
) => {
  boardSetValue(board, getCellCoordsByIndex(index), value)
}

export const boardSetValue = (
  board: Board,
  coords: CellCoords,
  value: number | null
) => {
  const [row, cell] = coords

  board[row - 1][cell - 1] = value
}

export const boardGetValue = (
  board: Board,
  rowIndex: number,
  cellIndex: number
) => {
  const row = board[rowIndex - 1]

  if (!row) {
    return undefined
  }

  return row[cellIndex - 1]
}
