import express from "express";
import { login, register } from "../controllers/authController";
import { isAdmin, validateToken } from "../middlewares/authMiddleware";
import { assignRole, viewAllUsers } from "../controllers/userController";
export const routes = express.Router();


routes.post("/login",login)
routes.post("/register",register)

routes.put('/assignRole', [validateToken, isAdmin], assignRole);
routes.get('/viewAllUsers', [validateToken, isAdmin], viewAllUsers);


routes.get("/test",(req,res)=>{
  res.json(" RoleGuard_Backend healthcheck Success")
})
