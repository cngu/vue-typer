function validNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val)
}

function validRange(lower, upper) {
  return validNumber(lower) && validNumber(upper) && lower <= upper
}

/**
 * Returns a random int in the range [min, max], or -1 if:
 *  - min and/or max are not of type 'number', NaN, or Infinity
 *  - min > max
 */
export default (min, max) => {
  if (!validRange(min, max)) {
    return -1
  }

  // Since we're generating random integers, rounded the arguments to the closest int within the range
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
