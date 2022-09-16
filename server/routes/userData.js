const router = require("express").Router();
const { getUserData } = require("../controllers/userData");
router.get("/user/:name", getUserData);
module.exports = router;
