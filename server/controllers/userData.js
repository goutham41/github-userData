const UserData = require("../models/userData");
const axios = require("axios");
module.exports.getUserData = async (req, res) => {
  await UserData.findOne({
    name: req.params.name,
  }).exec((err, succ) => {
    if (err) {
      res.status(401).send({
        message: "some thing went wrong",
      });
    } else {
      if (succ === null) {
        axios
          .get(`https://api.github.com/users/${req.params.name}/repos`)
          .then((result) => {
            let UserInfo = new UserData({
              user_data: result.data,
              name: req.params.name,
              status: true,
            });
            UserInfo.save((err, success) => {
              if (err) {
                res.status(401).send({
                  message: "SOME THING WENT WRONG TRY AGAIN",
                });
              } else {
                res.status(200).send(success);
              }
            });
          });
      } else {
        if (succ.status === true) {
          res.status(201).send(succ);
        }else{
          res.status(201).send({ message: "your data in trash" });
        }
      }
    }
  });
};

module.exports.getAllUserData = (req, res) => {
  UserData.find().exec((err, succ) => {
    if (succ) {
      res.status(201).send(succ);
    } else {
      res.status(401).send({
        message: "SOME THING WENT WRONG TRY AGAIN",
      });
    }
  });
};

module.exports.SoftDeleteUser = async (req, res) => {
  await UserData.findOneAndUpdate(
    { name: req.params.name },
    { $set: { status: false } },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send({message:"userdata was softdeleted"});
    }
  });
};


module.exports.RestoreUser = async (req, res) => {
  await UserData.findOneAndUpdate(
    { name: req.params.name },
    { $set: { status: true } },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send({ message: "userdata was restored" });
    }
  });
};
