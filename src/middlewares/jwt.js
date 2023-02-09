const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: 1 * 24 * 60 * 60
  },
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false, { message: "Server Error" });
        });
    })
  );
};
