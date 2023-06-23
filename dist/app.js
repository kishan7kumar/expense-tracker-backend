"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const expenses_1 = __importDefault(require("./routes/expenses"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/expenses", expenses_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Not found");
});
mongoose_1.default
    .connect(config_1.DB)
    .then(() => {
    console.log("Connected successfully to MongoDB...");
})
    .catch(() => {
    throw (0, http_errors_1.default)(501, "Unable to connect to MongoDB!!!");
});
app.set("port", config_1.PORT);
let http = require("http").Server(app);
global.io = require("socket.io")(http, {
    cors: {
        origin: config_1.clientURL,
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    console.log("User Connected....");
});
const server = http.listen(config_1.PORT, function () {
    console.log("listening on port" + config_1.PORT);
});
app.use(errorHandler_1.errorHandler);
