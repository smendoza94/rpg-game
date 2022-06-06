const router = require("express").Router();
const {
  getUserById,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../../controllers/user-controller");

//Set up GET all and PST at /api/users
router.route("/").get(getAllUser).post(createUser);

//Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// User login verfication route, successful login saves to browser cookies
router.route("/login").get(loginUser);

// User logout request route
router.route("/logout").get(logoutUser);

module.exports = router;
