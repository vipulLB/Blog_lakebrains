import express from 'express';
import {
  signUp,
  signInUser,
  signInAdmin,
  googleLogin
} from '../controllers/auth-controller.js';

const router = express.Router();
// validators
import runValidation from '../validators/index.js';
import {
  userSignupValidator,
  userSigninValidator,

} from '../validators/auth-validator.js';

// if validation is passed, execute the code in signup and signin controllers
router.post('/signup', userSignupValidator, runValidation, signUp);
router.post('/signin', userSigninValidator, runValidation, signInUser);
router.post('/signin-admin', userSigninValidator, runValidation, signInAdmin);

// // *** GOOGLE LOGIN ****
router.post('/google-login', googleLogin);


export default router;
