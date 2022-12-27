//* SERVER *//

// Lib
import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv' // see
dotenv.config()
// var cors = require("cors");
import cors from 'cors'

// Routes Links
import authRoutes from "./routes/auth-routes.js";
import blogRoutes from "./routes/blogs-routes.js";



// App
const app = express();
app.use(express.json());

// Set the cookieParser midderware
app.use(cookieParser());




// Get connection with mongodb server
let URL = process.env.DATABASE_URL
let Password = process.env.DATABASE_PASSWORD

//cors
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));



URL = URL.replace('<password>', Password)
mongoose.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!');
    }
);

// Home Route
app.get("/", (req, res) => {
    res.send("App is running")
})

// Routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);


// App Listen
app.listen(8080, () => console.log(`app is running on http://localhost:${"8080"}`))