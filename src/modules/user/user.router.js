import { Router } from "express";
import * as userController from './user.controller.js'

const userRouter=Router();

userRouter.post("/signup",userController.signup)
userRouter.post("/login",userController.login)
userRouter.get("/",userController.getAllUsers)
userRouter.get("/:id",userController.getSpecificUser)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)
 export default userRouter;