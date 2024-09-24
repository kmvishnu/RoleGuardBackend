"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const collections_1 = require("./middlewares/collections");
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
dotenv_1.default.config();
collections_1.MiddleWareCollections.essentials(app);
app.use((0, cors_1.default)());
app.use("/", routes_1.routes);
const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map