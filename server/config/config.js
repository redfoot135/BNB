require('dotenv').config();
const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_DBNAME, DATABASE_PORT } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_DBNAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: "mysql"
  },
  test: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_DBNAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: "mysql"
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_DBNAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: "mysql"
  }
}
