import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import path from "path";
//for custom js modules the file extension is mandatory
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
//our evironment variables should be loaded before we connect to DB
connectDB();

const app = express();

//server logs plugin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//to allow json data in body
app.use(express.json());

//routing with mouting custom router middleware
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//after all our api routes
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  //set frontend/build as our static
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //get any route thats not our api then point to index.html in build folder
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  //routing without custom router middleware test route for staging & development
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//error handling middleware *** list it below other routes
app.use(notFound);
app.use(errorHandler);

//this will search in .env for port no. if not found it will set to 500
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} environment on port ${PORT}`
      .yellow.bold
  )
);
