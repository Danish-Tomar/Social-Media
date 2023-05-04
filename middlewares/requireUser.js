const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    // return res.status(401).send("User not Authroized");
    return res.send(error(401, "User not Authroized"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_PRIVATE_TOKEN_KEY
    );
    req._id = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    // return res.status(401).send("Inviled User");
    return res.send(error(401, "Inviled User"));
  }
};
