/**
 * Performs a shallow comparison between 2 arrays.
 * @param {Array} a1
 * @param {Array} a2
 * @returns true if the array contents are strictly equal (===); false otherwise
 */
export default (a1, a2) => {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    return false
  }

  if (a1.length !== a2.length) {
    return false
  }

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false
    }
  }

  return true
}
