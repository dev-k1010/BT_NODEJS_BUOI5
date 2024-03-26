import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

const model = initModels(sequelize);

//  list restaurant
const getRestaurant = async (req, res) => {
  let data = await model.restaurant.findAll();

  responseData(res, "Thành công", 200, data);
};
// list like
const likeRestaurant = async (req, res) => {
  let { idRestaurant } = req.params;

  let data = await model.likeres.findAll({
    where: { res_id: idRestaurant },
  });

  responseData(res, "Thành công", 200, data);
};
// list rate
const rateRestaurant = async (req, res) => {
  let { idRestaurant } = req.params;

  let data = await model.rate_res.findAll({
    where: { res_id: idRestaurant },
  });

  responseData(res, "Thành công", 200, data);
};
// rate
const userRate = async (req, res) => {
  let { content } = req.body;

  let { idUser, idRestaurant } = req.params;
  let data = await model.rate_res.create({
    user_id: idUser,
    res_id: idRestaurant,
    amount: content,
    date_like: new Date(),
  });
  responseData(res, content, 200, data);
};
// List order
const listOrder = async (req, res) => {
  let { userId } = req.params;

  let orders = await model.orders.findAll({
    where: { user_id: userId },
    include: ["food_relation"],
  });

  let ordersWithSubFoods = orders.map(async (order) => {
    let subFoodIds = order.arr_sub_id.split(",").map((id) => parseInt(id));

    let subFoods = await model.sub_food.findAll({
      where: { sub_id: subFoodIds },
    });

    return {
      user_id: order.user_id,
      food_id: order.food_id,
      amount: order.amount,
      code: order.code,
      arr_sub_id: order.arr_sub_id,
      user_relation: order.user_relation,
      food_relation: order.food_relation,
      sub_foods: subFoods,
    };
  });

  ordersWithSubFoods = await Promise.all(ordersWithSubFoods);
  responseData(res, "Thành công", 200, ordersWithSubFoods);
};

export { getRestaurant, likeRestaurant, rateRestaurant, userRate, listOrder };
