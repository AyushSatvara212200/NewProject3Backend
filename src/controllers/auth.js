const User = require("../models/user");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
  // Make sure this account doesn't already exist
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (user)
      return res.status(401).json({
        message:
          "The phone number you have entered is already associated with another account.",
      });
    // Create and save the user
    const count = await User.countDocuments();
    console.log("count", count);
    const usertype = count === 0 ? "admin" : "user";
    const newUser = new User({
      ...req.body,
      usertype,
    });
    const usr = await newUser.save();
    return res.status(200).json({ token: usr.generateJWT(), user: usr });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
  User.findOne({ phone: req.body.phone })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          msg:
            "The phone number " +
            req.body.phone +
            " is not associated with any account. Double-check your phone number and try again.",
        });

      //validate password
      if (!user.comparePassword(req.body.password))
        return res.status(401).json({ message: "Invalid phone or password" });

      // Login successful, write token, and send back user
      res.status(200).json({ token: user.generateJWT(), user: user });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
