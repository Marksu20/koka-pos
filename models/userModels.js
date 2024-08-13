import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username is required"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please entere a valid email"] 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be aleast 6 characters long"]
  },  
});

// hash password before saving in database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model('User', userSchema);
