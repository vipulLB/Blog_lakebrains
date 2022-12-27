import express from 'express';
import { verifyToken } from "../validators/jwtGenerate.js";
import {
  createBlog , getBlog , updateBlog , deleteBlog
} from '../controllers/blogs-controller.js';

const router = express.Router();
// validators
// import runValidation from '../validators/index.js';
// import {
//   userSignupValidator,
//   userSigninValidator,

// } from '../validators/auth-validator.js';

// if validation is passed, execute the code in signup and signin controllers
router.post('/create-blog',verifyToken, createBlog);
router.get('/get-blog',getBlog);
router.put('/update-blog',verifyToken,updateBlog);
router.delete('/delete-blog/:id',verifyToken,deleteBlog);


export default router;
