const express = require("express");
const dotenv = require("dotenv");
const dbconncet = require("./dbconncet");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");
const userRouter=require('./routers/userRouter')
const postRouter = require("./routers/postRouter");
const cookieparser = require("cookie-parser");

const cloudinary = require('cloudinary').v2;
dotenv.config("./.env");


// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINART_CLOUD_NAME,
  api_key: process.env.CLOUDINART_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECERIT
});


const app = express();
const cors = require("cors");
//middmlieware
app.use(express.json({limit:'10mb'}));
app.use(morgan("common"));
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use('/user',userRouter)
app.get("/", (req, res) => {
  res.status(200).send("successful work");
});

const port = process.env.PORT || 3000;
dbconncet();
app.listen(port, () => {
  console.log(`Listen Request on port ${port}`);
});
