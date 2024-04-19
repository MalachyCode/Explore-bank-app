"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    createdOn: Date,
    type: String,
    accountNumber: Number,
    cashier: String,
    amount: Number,
    oldBalance: Number,
    newBalance: Number,
    description: String,
});
transactionSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
// module.exports = mongoose.model('User', userSchema);
exports.default = mongoose_1.default.model('Transaction', transactionSchema);
