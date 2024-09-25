import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import pool from "../config/db";

export const register = async (req: Request, res: Response) => {
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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO roleguard_users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, "member"]
    );

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error("Error during register:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
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

    try{
      const result = await pool.query(
        "SELECT * FROM roleguard_users WHERE email = $1",
        [email]
      );
    
      const user = result.rows[0];
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
    
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
    
      const token = jwt.sign(data, jwtSecretKey);
    
      res
        .status(200)
        .json({ status: "success", token, name: user ? user.name : "", role:user ? user.role : "member" });
    }
    catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal server error" }); 
    }
};

