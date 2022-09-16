require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserDataRouter = require("./routes/userData")
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
app.use("/start",(req,res)=>{
res.send("server Started")
});
app.use("/github",UserDataRouter)
app.listen(process.env.PORT, async () => {
  await connection;
  console.log("connected to db");
  console.log(`Server started on ${process.env.PORT}`);
});
