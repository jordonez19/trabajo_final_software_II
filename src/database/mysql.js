const { Sequelize } = require("sequelize");
const { conectionMysql } = require("../config");
require("dotenv").config();

const sequelize = new Sequelize(
  conectionMysql.MYSQL_DATABASE,
  conectionMysql.MYSQL_USERNAME,
  conectionMysql.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: "mysql",
  }
);

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a MYSQL conectado correctamente.");
  })
  .catch((err) => {
    console.error("No se puede conectar a MYSQLDB:", err);
  });
