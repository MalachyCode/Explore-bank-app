"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
if (config_1.default.MONGODB_URI) {
    logger_1.default.info('connecting to', config_1.default.MONGODB_URI);
    mongoose_1.default
        .connect(config_1.default.MONGODB_URI)
        .then(() => {
        logger_1.default.info('connected to MongoDB');
    })
        .catch((error) => {
        logger_1.default.error('error connecting to MongoDB:', error.message);
    });
}
app.use((0, cors_1.default)());
// app.use(express.static('build'));
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use('/api/users', users_1.default);
app.use('/api/accounts', accounts_1.default);
app.use('/api/transactions', transactions_1.default);
app.use('/api/notifications', notifications_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
// module.exports = app
exports.default = app;
