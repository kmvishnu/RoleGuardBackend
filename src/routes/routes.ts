import express from "express";
import { login, register } from "../controllers/authController";
export const routes = express.Router();


routes.post("/login",login)
routes.post("/register",register)
routes.get("/test",(req,res)=>{
  res.json(" RoleGuard_Backend healthcheck Success")
})
