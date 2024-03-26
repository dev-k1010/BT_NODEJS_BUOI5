import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food from "./food.js";
import _food_type from "./food_type.js";
import _like_res from "./like_res.js";
import _orders from "./orders.js";
import _rate_res from "./rate_res.js";
import _restaurant from "./restaurant.js";
import _sub_food from "./sub_food.js";
import _users from "./users.js";

export default function initModels(sequelize) {
  const users = _users.init(sequelize, DataTypes);
  const food = _food.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);

  // custom sub-table like-res ---- Primary key: user_id, res_id
  const likeres = sequelize.define(
    "like_res",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      res_id: {
        type: Sequelize.INTEGER,
      },
      date_like: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  restaurant.hasMany(likeres, {
    as: "like_res_relations",
    foreignKey: "res_id",
  });
  users.hasMany(likeres, { as: "like_res_relations", foreignKey: "user_id" });
  users.belongsToMany(restaurant, {
    through: likeres,
    foreignKey: "user_id",
    otherKey: "res_id",
    as: "likedRestaurants",
  });
  restaurant.belongsToMany(users, {
    through: likeres,
    foreignKey: "res_id",
    otherKey: "user_id",
    as: "likingUsers",
  });

  // sub-table rate
  users.belongsToMany(restaurant, {
    through: "rate_res",
    foreignKey: "user_id",
    otherKey: "res_id",
  });
  restaurant.belongsToMany(users, {
    through: "rate_res",
    foreignKey: "res_id",
    otherKey: "user_id",
  });

  // sub-table order
  users.belongsToMany(food, {
    through: "orders",
    foreignKey: "user_id",
    otherKey: "food_id",
    as: "order_user_relations",
  });
  food.belongsToMany(users, {
    through: "orders",
    foreignKey: "food_id",
    otherKey: "user_id",
    as: "order_food_relations",
  });

  orders.belongsTo(users, { foreignKey: "user_id", as: "user_relation" });
  orders.belongsTo(food, { foreignKey: "food_id", as: "food_relation" });

  food.belongsTo(food_type, { as: "type_relation", foreignKey: "type_id" });
  food_type.hasMany(food, { as: "food_relations", foreignKey: "type_id" });
  
  rate_res.belongsTo(restaurant, {
    as: "restaurant_relation",
    foreignKey: "res_id",
  });
  restaurant.hasMany(rate_res, {
    as: "rate_res_relations",
    foreignKey: "res_id",
  });

  rate_res.belongsTo(users, {
    as: "user_relation_rate",
    foreignKey: "user_id",
  });
  users.hasMany(rate_res, { as: "rate_res_relations", foreignKey: "user_id" });
  
  sub_food.belongsTo(food, { as: "food_relation", foreignKey: "food_id" });
  food.hasMany(sub_food, { as: "sub_food_relations", foreignKey: "food_id" });

  

  return {
    food,
    food_type,
    likeres,
    orders,
    rate_res,
    restaurant,
    sub_food,
    users,
  };
}
