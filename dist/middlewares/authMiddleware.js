"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Invalid Token!" });
    }
    try {
        const key = process.env.JWT_SECRET;
        return jsonwebtoken_1.default.verify(token, key, (err, decoded) => {
            if (err) {
                console.log(err);
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid token!" });
            }
            req['user'] = decoded;
            return next();
        });
    }
    catch (e) {
        console.log(e);
        return res
            .status(401)
            .json({ success: false, message: "Invalid token!" });
    }
};
exports.validateToken = validateToken;
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admins only' });
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=authMiddleware.js.map