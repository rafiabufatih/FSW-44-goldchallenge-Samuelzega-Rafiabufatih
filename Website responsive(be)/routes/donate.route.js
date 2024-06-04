const express = require("express");
const router = express.Router();
const donateController = require("../controller/donate.controller");
const userController = require("../controller/user.controller");
const checkUserMiddleware = require("../middleware/checkUser");

// Routes Users
router.get("/api/users", userController.getAllUser);
router.get("/api/users/:id", userController.getUserbyId);
router.post(
  "/api/users",
  checkUserMiddleware.checkIfUserExist,
  userController.addUser
);
router.put("/api/users/:id", userController.putUserbyId);
router.delete("/api/users/:id", userController.deleteUserbyId);

// Auth login users
router.get("/auth/login", userController.getAllUser);
router.post(
  "/auth/login",
  checkUserMiddleware.loginUserCheck,
  userController.loginUser
);

// Donation
router.get("/api/zakat", donateController.getZakat);
router.get("/api/zakat/:id", donateController.getZakatbyId);
router.post("/api/zakat", donateController.postZakat);

module.exports = router;
