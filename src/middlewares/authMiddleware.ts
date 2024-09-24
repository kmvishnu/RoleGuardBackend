import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: "Invalid Token!" })
    }
    try {
        const key = process.env.JWT_SECRET;

        return jwt.verify(token, key, (err, decoded) => {
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
}

export const isAdmin = (req, res: Response, next: NextFunction) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admins only' });
    }
    next();
};
