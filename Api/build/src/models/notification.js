"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    owner: String,
    newNotifications: [
        {
            message: {
                type: String,
                minLength: 3,
                required: true,
            },
            accountId: String,
            accountNumber: Number,
            transactionId: String,
        },
    ],
    oldNotifications: [
        {
            message: String,
            accountId: String,
            accountNumber: Number,
            transactionId: String,
        },
    ],
});
notificationSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
// module.exports = mongoose.model('User', userSchema);
exports.default = mongoose_1.default.model('Notification', notificationSchema);
