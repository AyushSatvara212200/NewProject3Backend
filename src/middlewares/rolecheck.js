// const Entries = require("../models/entries");

exports.users = (req, res, next) => {
  console.log("req", req.originalUrl);
  const id = req.params.id;
  const userId = req.user._id;
  const allowed = ["admin"];
  if (!req.user || allowed.indexOf(req.user.usertype) < 0) {
    if (userId.toString() !== id.toString()) {
      return res.status(401).json({
        message: "Sorry, you don't have the permission to access this data.",
      });
    }
    // return res.status(401).json({message: "Sorry, you don't have the permission to access this data."});
  }
  // if (allowed.indexOf(req.user.usertype) < 0) {
  //     if (userId.toString() !== id.toString()) {
  //         return res.status(401).json({message: "Sorry, you don't have the permission to access this data."});
  //     }
  // }
  next();
};

exports.admin = (req, res, next) => {
  const user = req.user;
  if (user.usertype !== "admin") {
    return res.status(401).json({
      message: "Sorry, you don't have the permission to access this data.",
    });
  }
  next();
};

// exports.entries = async (req, res, next) => {
//   const id = req.params.id;
//   const userId = req.user._id;
//   try {
//     const allowed = ["admin"];
//     const cRecord = await Entries.findById(id);
//     let recordUserId = null;
//     if (cRecord) {
//       recordUserId = cRecord.userId;
//     }
//     console.log("entries recordUserId", recordUserId);
//     if (!recordUserId) {
//       return res.status(404).json({ message: "Sorry, no such entry exists" });
//     }
//     if (
//       allowed.indexOf(req.user.usertype) < 0 &&
//       userId.toString() !== recordUserId.toString()
//     ) {
//       return res.status(401).json({
//         message: "Sorry, you don't have the permission to access this data.",
//       });
//     }
//     req.params.userId = recordUserId;
//     next();
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
