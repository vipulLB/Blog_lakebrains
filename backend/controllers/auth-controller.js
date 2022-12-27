import User from '../models/user-model.js';
import crypto from 'crypto';
import { jwtGenerate } from "../validators/jwtGenerate.js";

// *** GOOGLE AUTH ***
import { OAuth2Client } from 'google-auth-library';

const signUp = async (req, res, next) => {
    try {
        const user = req.body
        const userData = await User.create(user)

        // generating activeToken for account activation
        const activeToken = jwtGenerate(userData._id);

        res.cookie("token", activeToken, { httpOnly: true });

        return res.send(userData);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

const signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const [userData] = await User.find({ email: email })

        if (!userData) {
            throw new Error("Incorrect Email");
        }

        const passwordHash = await crypto
            .createHmac('sha1', userData.salt)
            .update(password)
            .digest('hex');

        if (passwordHash === userData.hashed_password) {

            // generating activeToken for account activation
            const activeToken = jwtGenerate(userData._id);
            res.cookie("token", activeToken, { httpOnly: true });

            return res.send(userData);
        } else {
            throw new Error("Incorrect Password");
        }

    } catch (error) {
        // error handlig
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

const signInAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const [userData] = await User.find({ email: email })

        if (userData.role !== 0) {
            throw new Error("You are not Autharized Admin");
        }

        if (!userData) {
            throw new Error("Incorrect Email");
        }

        const passwordHash = await crypto
            .createHmac('sha1', userData.salt)
            .update(password)
            .digest('hex');

        if (passwordHash === userData.hashed_password) {

            // generating activeToken for account activation
            const activeToken = jwtGenerate(userData._id);
            res.cookie("token", activeToken, { httpOnly: true });

            return res.send(userData);
        } else {
            throw new Error("Incorrect Password");
        }

    } catch (error) {
        // error handlig
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

const googleLogin = (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const idToken = req.body.tokenId;
  
    // client
    //   .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    //   .then((response) => {
    //     console.log(response);
    //     const { email_verified, name, email, jti } = response.payload;
  
    //     if (email_verified) {
    //       User.findOne({ email }).exec((err, user) => {
    //         // user exists in the database
    //         if (user) {
    //           // generate token
    //           const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //             expiresIn: '1d',
    //           });
    //           // add token to response cookie
    //           res.cookie('token', token, { expiresIn: '1d' });
    //           const { _id, email, name, role, username } = user;
    //           return res.json({
    //             token,
    //             user: { _id, email, name, role, username },
    //           });
    //         } else {
    //           // user does not exist in the database
    //           // create new user
    //           let username = shortId.generate();
    //           let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    //           let password = jti + process.env.JWT_SECRET;
    //           user = new User({ name, email, profile, username, password });
    //           user.save((err, data) => {
    //             if (err) {
    //               return res.status(400).json({
    //                 error: errorHandler(err),
    //               });
    //             }
    //             // generate token
    //             const token = jwt.sign(
    //               { _id: data._id },
    //               process.env.JWT_SECRET,
    //               {
    //                 expiresIn: '1d',
    //               }
    //             );
    //             // add token to response cookie
    //             res.cookie('token', token, { expiresIn: '1d' });
    //             const { _id, email, name, role, username } = data;
    //             return res.json({
    //               token,
    //               user: { _id, email, name, role, username },
    //             });
    //           });
    //         }
    //       });
    //     } else {
    //       return res.status(400).json({
    //         error: 'Google login failed. Try again.',
    //       });
    //     }
    //   });
  };

export { signUp , signInUser , signInAdmin , googleLogin }