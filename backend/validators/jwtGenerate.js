import jwt from "jsonwebtoken";
const config = process.env;
// import decoded from "jwt-decode";

// jwt (jwtGenerate)
const jwtGenerate = (_id) => {

  // generate jwt-token
  let token = jwt.sign({ _id }, `${process.env.JWT_TOKEN}`, {
    expiresIn: "24h",
  });

  return token;
};

//Validate token
const verifyToken = (req, res, next) => {
  try {
    // TOKEN 
    const token =
      req.cookies.token || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      // throw error if  User is not authenticate
      throw new Error("User is not authenticate");
    }
    // verify decoded Token 
    const decoded = jwt.verify(token, `${config.TOKEN_KEY}`);

    req.user = decoded;

    return next();

  } catch (error) {
    // error handling
    res.status(400).json({
      status: "fail",
      error: error.message
    })
  }
};


// // user Token Verify
// exports.verifyUserToken = (data) => {
//   try {
//     const token = data;
//     // check If token not match
//     if (!token) {
//       // throw Err if User is not authenticate
//       throw new Error("User is not authenticate");
//     }
//     //Verify Token 
//     const decoded = jwt.verify(token, `${config.TOKEN_KEY}`);

//     return decoded;
//   } catch (error) {
//     return error;
//   }
// };

// // Token Vwlidate 
// exports.velidateToken = (req, res, next) => {
//   let token;
//   if(req.query.token){
//     token = req.query.token;
//   }
//   else {
//     token = req.cookies.token;
//   }

//   var Decoded = decoded(token);

//   const currentDate = new Date();

//   const expDate = new Date(Decoded.exp * 1000);
// // check Token Expired or not 
//   if (currentDate.getTime() >= expDate.getTime()) {
//     res.cookie("token", token, { httpOnly: true });
//     res.status(204).json({
//       status: "fail",
// // if user token expired 
//       data: {
//         message: "User Token Expired.",
//       },
//     });
//   } else {
//     res.cookie("token", token, { httpOnly: true });
//     res.status(200).json({
//       status: "sucess",
// // if user token verify
//       data: {
//         token: token,

//         message: "User Token is sucessfully Send.",
//       },
//     });
//   }
// }

export { jwtGenerate, verifyToken }