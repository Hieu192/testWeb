const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose
    .connect('mongodb+srv://hieuthptchuyenbl:123456789h@cluster0.hn8eo.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  
  } catch (error) {
  console.log(error)    
  }
};

module.exports = connectDatabase;