

const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  user_data: { type: Array, default: [] },
  name:String
});
const UserData = mongoose.model("userData", UserDataSchema);
module.exports = UserData;
