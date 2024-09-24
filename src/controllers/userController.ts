import { Request, Response } from "express";
import pool from "../config/db";

export const assignRole = async (req: Request, res: Response) => {
    const { userId, role } = req.body;

    await pool.query('UPDATE roleguard_users SET role = $1 WHERE id = $2', [role, userId]);
    res.status(200).json({ message: 'Role updated' });
};

export const viewAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            "select id, name, email, role from roleguard_users "
        );
       
        res
            .status(200)
            .json({ status: "success", data : result.rows });
    }
    catch (error) {
        console.error("Error while fetching data", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
