export function nonNegativeNumberValidator(prop) {
  return prop >= 0
}

export function stringArrayValidator(prop) {
  return prop.every(item => typeof item === 'string')
}
