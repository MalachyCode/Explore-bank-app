"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    balance: {
        type: Number,
        required: true,
    },
    createdOn: Date,
    owner: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    accountNumber: Number,
    type: String,
});
accountSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
// module.exports = mongoose.model('User', userSchema);
exports.default = mongoose_1.default.model('Account', accountSchema);
