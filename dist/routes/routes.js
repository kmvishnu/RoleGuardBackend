"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
exports.routes = express_1.default.Router();
exports.routes.post("/login", authController_1.login);
exports.routes.post("/register", authController_1.register);
exports.routes.get("/test", (req, res) => {
    res.json(" RoleGuard_Backend healthcheck Success");
});
//# sourceMappingURL=routes.js.map