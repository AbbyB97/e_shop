import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("token found");
    try {
     
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
     
        //fetching the user from db to use in our protected routes
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {

        console.log(error);
        res.status(401)
        throw new Error("not authorized , token failed")

    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, token expired");
  }
});

export { protect };
