import express from "express";
const router = express.Router();
import mongoose from 'mongoose'
import { authUser,getUserProfile,registerUser} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

//we dont need whole url as we are pointing to this file from server.js



router.route('/').post(registerUser);
// fetch all products
// public Get /api/productss
// we only have post request to /login thus we can use it without router
router.post('/login',authUser);

//adding protected route
router.route('/profile').get(protect,getUserProfile)

// router.route("/:id").get(getProductById)

export default router;
