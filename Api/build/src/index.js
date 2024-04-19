"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // the actual Express application
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app_1.default.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
});
