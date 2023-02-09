const User = require("../models/user");
const _ = require("lodash");
const { generatePassword } = require("../utils/password");
// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  try {
    const { email, usertype, firstName, lastName } = req.query;
    let = { skip, limit } = req.query;
    const query = {};
    if (email) {
      query.email = { $regex: email, $options: "i" };
    }
    if (firstName) {
      query.firstName = { $regex: firstName, $options: "i" };
    }
    if (lastName) {
      query.lastName = { $regex: lastName, $options: "i" };
    }
    if (usertype) {
      query.usertype = usertype;
    }

    if (!_.isNumber(skip)) {
      skip = _.toInteger(skip);
    }

    if (!_.isNumber(limit)) {
      limit = _.toInteger(limit);
    }

    if (_.isNaN(skip)) {
      skip = 0;
    }

    if (_.isNaN(limit)) {
      limit = 0;
    }

    console.log(req.query);
    const total = await User.find(query).countDocuments();
    const users = await User.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({ users, total });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
  try {
    const { phone } = req.body;

    // Make sure this account doesn't already exist
    const user = await User.findOne({ phone });

    if (user)
      return res.status(401).json({
        message:
          "The phone number you have entered is already associated with another account. You can change this users role instead.",
      });

    // const password = "_" + Math.random().toString(36).substr(2, 9); //generate a random password
    // console.log("before password");
    let password = "Test@123!";
    // try {
    //   password = generatePassword(10);
    // } catch (error) {
    //   console.log(error)
    // }

    const count = await User.countDocuments();
    console.log("count", count);
    // const usertype = count === 0 ? "admin" : "user";
    const newUser = new User({ ...req.body, password });
    const user_ = await newUser.save();
    res.status(200).json({
      message:
        "Here is your login credentials please take note!. it will not be displyed again",
      credentials: { phone, password },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.status(401).json({ message: "User does not exist" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;
    // console.log(req.user._id)
    // console.log(req.user.usertype)
    //Make sure the passed id is that of the logged in user

    if (req.user && req.user.usertype === "user") {
      if (userId.toString() !== id.toString())
        return res.status(401).json({
          message: "Sorry, you don't have the permission to upd this data.",
        });
    }

    if (req.user && req.user.usertype === "user" && req.body.usertype) {
      delete update.usertype;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    //if there is no image, return success message
    // if (!req.file)
    return res.status(200).json({ user, message: "User has been updated" });

    //Attempt to upload to cloudinary
    // const result = await uploader(req);
    // const user_ = await User.findByIdAndUpdate(
    //   id,
    //   { $set: update },
    //   { $set: { profileImage: result.url } },
    //   { new: true }
    // );

    // if (!req.file)
    //   return res
    //     .status(200)
    //     .json({ user: user_, message: "User has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user._id;
    if (req.user && req.user.usertype === "user") {
      //Make sure the passed id is that of the logged in user
      if (user_id.toString() !== id.toString())
        return res.status(401).json({
          message: "Sorry, you don't have the permission to delete this data.",
        });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.me = (req, res) => {
  // User.findOne({ phone: req.body.phone })
  //   .then((user) => {
  //     if (!user)
  //       return res.status(401).json({
  //         msg:
  //           "The phone number " +
  //           req.body.phone +
  //           " is not associated with any account. Double-check your phone number and try again.",
  //       });

  //     //validate password
  //     if (!user.comparePassword(req.body.password))
  //       return res.status(401).json({ message: "Invalid phone or password" });

  // Login successful, write token, and send back user

  console.log(req);
  return res.status(200).json(req.user);
  // })
  // .catch((err) => res.status(500).json({ message: err.message }));
};
