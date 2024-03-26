import express from "express";
import restaurantRouter from "./restaurantRouter.js";
import usersRouter from "./userRouter.js";

const rootRouter = express.Router();

// Restaurant
rootRouter.use("/restaurant", restaurantRouter);
// Users
rootRouter.use("/users", usersRouter);

export default rootRouter;
