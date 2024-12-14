export const getRandomElement = <T>(array: Array<T>): T => {
  return array[(array.length * Math.random()) | 0]
}

export const min = (a: number, b: number): number => {
  return a < b ? a : b
}

export const max = (a: number, b: number): number => {
  return a > b ? a : b
}
