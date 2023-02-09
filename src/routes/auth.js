const express = require("express");
const { check } = require("express-validator");
const { authenticate } = require("passport");
const Auth = require("../controllers/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post(
  "/login",
  [
    // check('email').isEmail().withMessage('Enter a valid email address'),
    check("phone", "Enter a valid phone"),
    check("password").not().isEmpty(),
  ],
  validate,
  Auth.login
);

router.post(
  "/register",
  [
    // check('email').isEmail().withMessage('Enter a valid email address'),
    check("phone", "Enter a valid phone"),
    check("email", "Enter a valid email address").isEmail(),
    check("firstName", "Enter a valid first name"),
    check("lastName", "Enter a valid lastname"),
    check("password").not().isEmpty(),
  ],
  validate,
  Auth.register
);

module.exports = router;
