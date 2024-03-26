import express from "express";
import {
  getUsers,
  likeUser,
  rateUser,
  userLike,
  userOrder,
} from "../controllers/userController.js";

const usersRouter = express.Router();

// list user
usersRouter.get("/get-users", getUsers);
// list like
usersRouter.get("/like-user/:idUser", likeUser);
// like - unlike
usersRouter.get("/like", userLike);
// list rate
usersRouter.get("/rate-user/:idUser", rateUser);
// order 
usersRouter.post("/order",userOrder)


export default usersRouter;
