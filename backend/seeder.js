//this script is used to import data
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
//we are not importing data for following models but we need these imports to clear these models
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//needed to connect to the for getting env var
dotenv.config();

connectDB();

// as we are dealing with our db using mongoose we get a promise async functions are used
const importData = async () => {
  try {
    //Wipe our current data before importing new
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //inserting static users into our User model
    const createdUsers = await User.insertMany(users);

    //getting admin user which is the first user in static list
    const adminUser = createdUsers[0]._id;
    
    //adding default admin id to static our static product list
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    }
    );
    await Product.insertMany(sampleProducts);
    console.log(`imported sample data!`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //Wipe our current data before importing new
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`data destroyed!`.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
