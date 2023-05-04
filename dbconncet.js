const mongoose = require("mongoose");
module.exports = async () => {
  const mongooseUri =
    "mongodb+srv://danishtomar:danishtomar123@cluster0.xb67tsm.mongodb.net/?retryWrites=true&w=majority";

  try {
    const hostName = await mongoose.connect(mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MOngoDB connected:)", hostName.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
