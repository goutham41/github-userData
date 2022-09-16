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
        res.status(201).send(succ);
      }
    }
  });
};
