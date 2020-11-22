import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// fetch all products
// public Get /api/products
const getProducts = asyncHandler(async (req, res) => {
  

  //regex to search by matching keyword
  const keyword = req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options : 'i'
    }}:{}
  

  
  const products = await Product.find({...keyword});
  //test error 401-> for not authorized
  // res.status(401)
  // throw new Error("not auth")
  res.json(products);
});

// fetch single products
//public  Get /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    //to set default 500 status as 404
    res.status(404);
    //our custom error handler we will get this message if its formatted object ID
    throw new Error("product not found");
  }
});



// Create product review
//public  POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById ,createProductReview};
