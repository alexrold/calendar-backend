const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log(' 🚀  Connection with the database successful. ');

  } catch (error) {
    throw new Error(' Failed to start the database. ', error);
  }
};
module.exports = {
  dbConnection
};
