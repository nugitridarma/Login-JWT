import Sequelize from "sequelize";

const db = new Sequelize("react_login", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;