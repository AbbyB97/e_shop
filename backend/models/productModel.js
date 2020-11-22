import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    //this individual rating will be used to get average for overall rating
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//here we define all the fields for that particular model
const productSchema = mongoose.Schema(
  {
    user: {
      //to know id of admin user who created the product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //to reference a model to this object id, it will create a relation between two
      ref: "User",
    },
    //for unrequired fields
    // name:String,
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    //auto create created at and updated at field
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product
