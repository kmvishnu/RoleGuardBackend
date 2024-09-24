"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllUsers = exports.assignRole = void 0;
const db_1 = __importDefault(require("../config/db"));
const assignRole = async (req, res) => {
    const { userId, role } = req.body;
    await db_1.default.query('UPDATE roleguard_users SET role = $1 WHERE id = $2', [role, userId]);
    res.status(200).json({ message: 'Role updated' });
};
exports.assignRole = assignRole;
const viewAllUsers = async (req, res) => {
    try {
        const result = await db_1.default.query("select id, name, email, role from roleguard_users ");
        res
            .status(200)
            .json({ status: "success", data: result.rows });
    }
    catch (error) {
        console.error("Error while fetching data", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.viewAllUsers = viewAllUsers;
//# sourceMappingURL=userController.js.map