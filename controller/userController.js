import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModels.js';

export const returnSignUpPage = (req, res) => {
  res.render('sign-up');
};

export const returnSignInPage = (req, res) => {
  res.render('sign-in');
};

export const signUp = async (req, res) => {
  try {
    //check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if(existingUser) {
      return res.status(400).json({ errors: { email: "Email Already Exists" }});
    }

    // create a user in db
    const user = await User.create(req.body);

    // generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.SECRET_KEY,
      { expiresIn: "1d" });

    res.cookie("jwt", token)

    res.status(201).json({
      user:{
        id: user._id,
        email: user.email,
        password: user.password,
      },
      token
    });
  } catch(error) {
   if(error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      })
      return res.status(500).json({ message: 'Error creating acount'});
    }
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.cookie("jwt", token);     

        res.status(201).json({
          user:{
            id: user._id,
            email: user.email,
            password: user.password,
          },
          token
        });
      }
      else {
        return res.status(400).json({ errors: { password: "Incorrect password" }})
      }
    } else {
      return res.status(500).json({ errors:{ email: "no user found with this email"}});
    }
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: "error during login"});
  }
};

export const signOutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/sign-in");
};
// export const getAllUsers = async (req, res) => {
//   try {
//     // retrieve all users from the database
//     const users = await User.find({}, { password: 0 }); // exclude the password field from the response

//     return res.status(200).json({ users });
//   } catch(error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "error fetching user "});
//   }
// }
