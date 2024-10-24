const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");
const Tamas = require("../models/tamas");
const Soalat = require("../models/soalat");
const KhabarName = require("../models/khabarName");

exports.index = (req, res) => {
  res.render("index", { pageTitle: "خشکشوی انلاین خرم اباد", path: "/", user: req.user});
};

exports.login = (req, res) => {
  res.render("login", {
    pageTitle: "ورود کاربر",
    path: "/login",
    layout: "./layouts/pageLayout.ejs",
    msg: req.flash("msg"),
    err: req.flash("error"),
    user: req.user
  });
};

exports.handelLogin = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

exports.remmeber = (req, res) => {
  if (req.body.remmber) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1_000; // 1 day
  } else {
    req.session.cookie.expires = null;
  }
  res.redirect("/dashbord");
};

exports.register = (req, res) => {
  res.render("register", {
    pageTitle: "ثبت نام",
    path: "/register",
    layout: "./layouts/pageLayout.ejs",
    err: req.flash("err"),
    user: req.user
  });
};

exports.handelRegister = async (req, res) => {
  try {
    await User.yupV(req.body);
    const user = await User.find({ email: req.body.email });
    if (user.length > 0) {
      req.flash("err", ["این ایمیل قبلا ثبت شده است"]);
      return res.redirect("back");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    req.flash("msg", "ثبت نام موفقیت امیز بود");
    res.redirect("/login");
  } catch (err) {
    const errors = [];
    err.errors.forEach((e) => {
      errors.push(e);
    });
    req.flash("err", errors);
    res.redirect("back");
  }
};

exports.tamas = (req, res) => {
  res.render("tamas", {
    pageTitle: "تماس با ما",
    path: "/tamas",
    err: req.flash("err"),
    msg: req.flash("msg"),
    user: req.user
  });
};

exports.handelPost = async (req, res) => {
  try {
    await Tamas.yupV(req.body);
    await Tamas.create({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text,
    });
    req.flash("msg", "پیام شما با موفیقت ارسال شد");
    res.redirect("back");
  } catch (err) {
    const errors = [];
    err.errors.forEach((e) => {
      errors.push(e);
    });
    req.flash("err", errors);
    res.redirect("back");
  }
};

exports.soalat = async (req, res) => {
  res.render("soalat", {
    pageTitle: "سوالات متداول",
    path: "/soalat",
    soalat: await Soalat.find(),
    user: req.user
  });
};

exports.khabarName = async (req, res) => {
  try {
    if ((await KhabarName.find({ email: req.body.email }).length) > 0) {
      return res.redirect("back");
    }
    await KhabarName.create({ email: req.body.email });
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
