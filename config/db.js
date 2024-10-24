const mongoose = require("mongoose");

mongoose
  .connect('mongodb://127.0.0.1/khoshkshii')
  .then((result) => {
    console.log(result.connection.host);
  })
  .catch((err) => {
    console.error(err);
  });
