const express = require("express");
const router = express.Router();
const User = require("../controllers/user");

router.route("/").get(User.index);
router.get("/me", User.me);
router.post("/add", User.store);
router.put("/update/:id", User.update);
router.delete("/delete/:id", User.destroy);
// router.post('/upload', User.upload);

module.exports = router;
