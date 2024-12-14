export const getRandomElement = <T>(array: Array<T>): T => {
  return array[(array.length * Math.random()) | 0]
}
