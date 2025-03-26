const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose
    .connect('mongodb://127.0.0.1:27017/testWeb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  
  } catch (error) {
  console.log(error)    
  }
};

module.exports = connectDatabase;