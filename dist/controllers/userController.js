"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllUsers = exports.assignRole = void 0;
const db_1 = __importDefault(require("../config/db"));
const assignRole = async (req, res) => {
    const { userId, role } = req.body;
    if (!role || (role !== 'member' && role !== 'admin')) {
        return res.status(400).json({
            status: "error",
            message: "Invalid role",
        });
    }
    if (!userId || typeof (userId) !== 'number') {
        return res.status(400).json({
            status: "error",
            message: "UserId should be of type number"
        });
    }
    try {
        await db_1.default.query('UPDATE roleguard_users SET role = $1 WHERE id = $2', [role, userId]);
        res.status(200).json({ message: 'Role updated' });
    }
    catch (err) {
        console.error("Error while updating data", err);
        return res.status(500).json({ error: "Internal server error" });
    }
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