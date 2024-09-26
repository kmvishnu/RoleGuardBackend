import { Request, Response } from "express";
import pool from "../config/db";

export const assignRole = async (req: Request, res: Response) => {
    const { userId, role } = req.body;

    if (!role || (role !== 'member' && role !== 'admin')) {
        return res.status(400).json({
            status: "error",
            message: "Invalid role",
        });
    }
    if(!userId || typeof(userId)!== 'number'){
        return res.status(400).json({
            status: "error",
            message: "UserId should be of type number"
          });
    }
      try{
        await pool.query('UPDATE roleguard_users SET role = $1 WHERE id = $2', [role, userId]);
        res.status(200).json({ message: 'Role updated' });
      }
      catch(err){
        console.error("Error while updating data", err);
        return res.status(500).json({ error: "Internal server error" });
      }

   
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
