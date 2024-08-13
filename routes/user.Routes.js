import express from 'express';
import { signUp, signIn, returnSignInPage, returnSignUpPage, signOutUser } from '../controller/userController.js'
// import { verifyToken } from '../config/isAuth.js';
const router = express.Router();

// router.get('/allusers', verifyToken, getAllUsers);

// GET: POS ACCOUNT
router.get('/sign-up', returnSignUpPage);

router.get('/sign-in', returnSignInPage);

router.get('/sign-out', signOutUser);

router.get('/reset-password', (req, res) => {
  res.render('reset-password')
});

// GET: POS
router.get('/index', (req, res) => {
  res.render('index')
});

router.get('/posOrders', (req, res) => {
  res.render('posOrders', {
    title: "pos_orders"
  })
});

router.get('/posReceipts', (req, res) => {
  res.render('posReceipts', {
    title: "pos_receipts"
  })
});

// POST: POS ACCOUNT
router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

export { router };

