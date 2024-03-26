import express from "express";
import {
  getRestaurant,
  likeRestaurant,
  listOrder,
  rateRestaurant,
  userRate,
} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();
// list restaurant
restaurantRouter.get("/get-rautaurant", getRestaurant);
// list like
restaurantRouter.get("/like-restaurant/:idRestaurant", likeRestaurant);
// list rate
restaurantRouter.get("/rate-restaurant/:idRestaurant", rateRestaurant);
// rate
restaurantRouter.post("/rate/:idUser/:idRestaurant", userRate);
// list order
restaurantRouter.get("/detail-order/:userId", listOrder);


export default restaurantRouter;
