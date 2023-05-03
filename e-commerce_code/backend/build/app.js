"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./server"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
// Normalize port number which will expose server
const port = normalizePort(8082);
// Instantiate the expressServer class
const expressInstance = new server_1.default().expressInstance;
// Make port available within server
expressInstance.set('port', port);
// Create the HTTP Express Server
exports.server = http_1.default.createServer(expressInstance);
// Start listening on the specified Port (Default: 3000)
exports.server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
(0, dbConnection_1.default)();
// Port Normalization
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
