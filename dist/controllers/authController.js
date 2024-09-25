"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || name.length < 2 || name.length > 20) {
        return res.status(400).json({
            status: "error",
            message: "Name must be between 2 and 20 characters long.",
        });
    }
    if (!password || password.length < 4 || password.length > 20) {
        return res.status(400).json({
            status: "error",
            message: "Password must be between 4 and 20 characters long.",
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid email address.",
        });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        await db_1.default.query("INSERT INTO roleguard_users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, hashedPassword, "member"]);
        res.status(201).json({ message: "User registered" });
    }
    catch (error) {
        console.error("Error during register:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!password || password.length < 4 || password.length > 20) {
        return res.status(400).json({
            status: "error",
            message: "Password must be between 4 and 20 characters long.",
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid email address.",
        });
    }
    try {
        const result = await db_1.default.query("SELECT * FROM roleguard_users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const jwtSecretKey = process.env.JWT_SECRET;
        const data = {
            time: Date(),
            id: user.id,
            name: user.name,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN),
        };
        const token = jsonwebtoken_1.default.sign(data, jwtSecretKey);
        res
            .status(200)
            .json({ status: "success", token, name: user ? user.name : "", role: user ? user.role : "member" });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map