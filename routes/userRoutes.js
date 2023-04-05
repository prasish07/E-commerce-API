const express = require("express");
const router = express.Router();
const { auth, authorizePermission } = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(auth, authorizePermission("admin", "owner"), getAllUsers);

router.route("/showMe").get(auth, showCurrentUser);
router.route("/updateUser").patch(auth, updateUser);
router.route("/updateUserPassword").patch(auth, updateUserPassword);

router.route("/:id").get(getSingleUser);

module.exports = router;
