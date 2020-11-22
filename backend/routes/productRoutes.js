import express from "express";
const router = express.Router();
import mongoose from 'mongoose'
import { getProducts ,getProductById,createProductReview} from '../controllers/productController.js'
import {protect} from '../middleware/authMiddleware.js'

//we dont need whole url as we are pointing to this file from server.js

// fetch all products
// public Get /api/productss
router.route('/').get(getProducts);

// fetch single products
//public  Get /api/products/:id
router.route("/:id").get(getProductById)

router.route("/:id/reviews").post(protect,createProductReview)

export default router;
