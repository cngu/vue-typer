export default (list) => {
  if (list instanceof Array) {
    // TODO
    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    // https://blog.codinghorror.com/the-danger-of-naivete/
    // https://blog.codinghorror.com/shuffling/?r=31644
    return list.reverse()
  }

  return []
}
