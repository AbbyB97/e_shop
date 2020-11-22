import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

//here we define all the fields for that particular model
const userSchema = mongoose.Schema(
  {
    //for unrequired fields
    // name:String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    //auto create created at and updated at field
    timestamps: true,
  }
);
//create custom model method
userSchema.methods.matchPassword = async function(enteredPassword) {
  // we return await because  it returns a promise 
  // we compare this.password as we called matchPasswords on that specific user  
  return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function(next){
  //to check if other fields are being modified and skip
  if(!this.isModified('password')){
    next()
  }
  const salt =await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User", userSchema);


export default User;
