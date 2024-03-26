
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);
// random code
const generateRandomCode = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
// list user
const getUsers = async (req, res) => {
  let data = await model.users.findAll();
  responseData(res, "Thành công", 200, data);
};
// list like
const likeUser = async (req, res) => {
  let { idUser } = req.params;
  let data = await model.likeres.findAll({
    where: { user_id: idUser },
  });
  responseData(res, "Thành công", 200, data);
};
// Like - Unlike
const userLike = async (req, res) => {
  let { userId, restaurantId } = req.body;
  let existingLike = await model.likeres.findOne({
    where: { user_id: userId, res_id: restaurantId },
  });

  if (existingLike === null) {
    // not exists -> create
    let data = await model.likeres.create({
      user_id: userId,
      res_id: restaurantId,
      date_like: new Date(),
    });
    responseData(res, "Người dùng đã like nhà hàng", 200, data);
  } else {
    // exists -> delete
    await existingLike.destroy();
    responseData(res, "Người dùng đã hủy like nhà hàng", 200, []);
  }
};
// list rate
const rateUser = async (req, res) => {
  let { idUser } = req.params;
  let data = await model.rate_res.findAll({
    where: { user_id: idUser },
  });
  responseData(res, "Thành công", 200, data);
};
// order
const userOrder = async (req, res) => {
  let { foodId, userId, amount, arr_sub_id } = req.body;
  let code = generateRandomCode(8);
  let data = await model.orders.create({
    user_id: userId,
    food_id: foodId,
    amount,
    code,
    arr_sub_id: arr_sub_id != null || arr_sub_id == "" ? arr_sub_id : foodId,
  });
  responseData(res, "Thành công", 200, data);
};

export { getUsers, likeUser, userLike, rateUser, userOrder };
