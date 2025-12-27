const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//user register API
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please provide a password with at least 6 characters"),
  ],
  userController.registerUser
);

//user login API
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please provide a password with at least 6 characters"),
  ],
  userController.loginUser
);

//user get profile API
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

//user logout API
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
