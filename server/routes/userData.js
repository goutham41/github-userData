const router = require("express").Router();
const { getUserData, getAllUserData, SoftDeleteUser, RestoreUser } = require("../controllers/userData");
router.get("/user/:name", getUserData);
router.get("/get",getAllUserData)
router.delete("/delete/:name",SoftDeleteUser)
router.delete("/restore/:name", RestoreUser);
module.exports = router;
