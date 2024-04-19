"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const info = (...params) => {
    console.log(...params);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error = (...params) => {
    console.error(...params);
};
// module.exports = {
//   info,
//   error,
// }
exports.default = {
    info,
    error,
};
