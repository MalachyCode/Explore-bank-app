"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
// module.exports = {
//   MONGODB_URI,
//   PORT,
// }
exports.default = {
    MONGODB_URI,
    PORT,
};
