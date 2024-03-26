import { Sequelize } from "sequelize";
import config from "../config/config.js";

//  Kết nối lấy data từ DB lên

const sequelize = new Sequelize(
  // Cấu hình chi tiết
  config.database,
  config.user,
  config.pass,
  {
    host: config.database.host,
    port: config.port,
    dialect: config.dialect,
  }
);
export default sequelize;
// dùng để test kết nối vào db
// try {
//     sequelize.authenticate()
//     console.log("OK")
// } catch (error) {
//     console.log(error)

// }
// node src/models/connect.js

// yarn add sequelize-auto