import jwt from 'jsonwebtoken';
import { User }  from '../models/userModels.js'

export const requireAuth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  //check if the user has token
  if(token) {
    const isValid = jwt.verify(token, process.env.SECRET_KEY);

    // check if token is valid or not
    if(isValid) {
      next();
    } else {
      res.redirect("/sign-in");
    }
  }
};

export const checkUser = (req, res, next) => {
  const { jwt: token } = req.cookies;
  res.locals.user = null;

  if(token) {
    jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
      if(err) next();

      const user = await User.findById(decoded.id);
      res.locals.user = user;
      next();
    })
  }
  else {
    next();
  }
}

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if(!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const decoded = await jwt.verify(token, process.env.SECRET_KEY);
//     if(!decoded) {
//       throw new Error();
//     }
//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "error validating token"});
//   }
// }