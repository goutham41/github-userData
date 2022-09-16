

const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  user_data: { type: Array, default: [] },
  name:String,
  status:Boolean
});
const UserData = mongoose.model("userData", UserDataSchema);
module.exports = UserData;
