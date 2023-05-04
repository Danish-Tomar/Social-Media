const bcrypt = require("bcrypt");
const User = require("../module/User");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");
const singupContoller = async (req, res) => {   
  try {
    const { email, password,name } = req.body;

    if (!email || !password ||!name) {
      // return res.status(400).send("Email and Password are required");
      return res.send(error(400, "Email and Password are required"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      // return res.status(409).send("User is already present.");
      return res.send(error(409, "User is already present."));
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    }); 
     
   

    // return res.json({
    //   user,
    // });
    return res.send(success(201, "User Createted Successfull"));
  } catch (e) {
return res.send(error(500,e.message));
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      // return res.status(400).send("Email and Password Are Required");
      return res.send(error(400, "Email and Password Are Required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // return res.status(404).send("User not registered.");
      return res.send(error(404, "User not registered."));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      // return res.status(403).send("Inncorrect password");
      return res.send(error(403, "Inncorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // return res.status(200).send({ accessToken });
    return res.send(success(200, { accessToken }));
  }catch (e) {
    return res.send(error(500,e.message));
      }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    // return res.status(401).send("Refresh token in cookies is required.");
    return res.send(error(401, "Refresh token in cookies is required."));
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_PRIVATE_TOKEN_KEY
    );
    const _id = decoded._id;

    const accessToken = generateAccessToken({ _id });
    // return res.status(201).send({ accessToken });
    return res.send(success(201, { accessToken }));
  } catch (err) {
    console.log(err);
    // return res.status(401).send("Invalid Refresh token");
    return res.send(error(401, "Invalid Refresh token"));
  }
};


const logoutController = async (req,res)=>{
  try {
    res.clearCookie("jwt",{

      httpOnly:true,
      secure:true

    });
    return res.send(success(200,"User Logout"))
  } catch (e) {
    return res.send(error(500, e.message))
  }
}

// internal function

const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_PRIVATE_TOKEN_KEY, {
    expiresIn: "1d",
  });
  console.log(token);
  return token;
};

const generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_PRIVATE_TOKEN_KEY, {
    expiresIn: "1y",
  });
  console.log(token);
  return token;
};
module.exports = {
  singupContoller,
  loginController,
  refreshAccessTokenController,
  logoutController
  
};

