const dotenv = require("dotenv"); //it will provide dotenv module object

dotenv.config(); // calling config function from object

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
};
