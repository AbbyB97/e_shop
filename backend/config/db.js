import mongoose from "mongoose"
import colors from "colors"

//we will use async because mangoose methods always returns promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold);
    process.exit(1)
  }
};

export default connectDB;
