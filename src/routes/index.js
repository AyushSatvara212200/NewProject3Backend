const auth = require("./auth");
const user = require("./user");
// const entries = require("./entries");
const admin = require("./admin");
const authenticate = require("../middlewares/authenticate");
const rolecheck = require("../middlewares/rolecheck");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message:
        "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
    });
  });
  app.use("/api/auth", auth);
  app.use("/api/user", authenticate, rolecheck.admin, user);
  // app.use("/api/entries", authenticate, entries);
  app.use("/api/admin", authenticate, rolecheck.admin, admin);
};
