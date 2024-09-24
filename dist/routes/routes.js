"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController_1 = require("../controllers/userController");
exports.routes = express_1.default.Router();
exports.routes.post("/login", authController_1.login);
exports.routes.post("/register", authController_1.register);
exports.routes.put('/assignRole', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], userController_1.assignRole);
exports.routes.get('/viewAllUsers', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], userController_1.viewAllUsers);
exports.routes.get("/test", (req, res) => {
    res.json(" RoleGuard_Backend healthcheck Success");
});
//# sourceMappingURL=routes.js.map