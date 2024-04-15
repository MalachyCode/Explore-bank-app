// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info = (...params: any[]) => {
  console.log(...params)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (...params: any[]) => {
  console.error(...params)
}

// module.exports = {
//   info,
//   error,
// }
export default {
  info,
  error,
}
