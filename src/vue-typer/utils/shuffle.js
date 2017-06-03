import randomInt from './random-int'

function swap(a, i, j) {
  if (i === j) {
    return
  }
  const temp = a[i]
  a[i] = a[j]
  a[j] = temp
}

/**
 * Performs an in-place shuffle.
 * Implemented using the Fisher-Yates/Knuth shuffle algorithm.
 * @param list - Array of items to shuffle in-place.
 */
export default (list) => {
  if (!(list instanceof Array)) {
    return
  }

  for (let i = list.length - 1; i > 0; i--) {
    let randomIndex = randomInt(0, i)
    swap(list, i, randomIndex)
  }
}
