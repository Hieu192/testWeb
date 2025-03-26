const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose
    .connect( process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  
  } catch (error) {
  console.log(error)    
  }
};

module.exports = connectDatabase;