const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "رمز عبور یا ایمیل اشتباه است" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "رمز عبور یا ایمیل اشتباه است" });
      }
      done(null, user);
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user)
  } catch (err) {
    done(err, false)
  }
});