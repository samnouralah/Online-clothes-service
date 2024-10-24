const path = require("path");

const jalaliMoment = require("jalali-moment");
const multer = require("multer");
const ShortUniqueId = require("short-unique-id");
const sharp = require("sharp");
const mongoose = require("mongoose");

const User = require("../models/user");
const Tamas = require("../models/tamas");
const Soalat = require("../models/soalat");
const KhabarName = require("../models/khabarName");
const Products = require("../models/products");
const Sefaresh = require("../models/sefaresh");

const uid = new ShortUniqueId({ length: 10 });

exports.dashbord = (req, res) => {
  if (req.user.admin) {
    res.render("admin/dashbord", {
      pageTitle: req.user.admin ? "داشبور ادمین" : "پنل کاربری",
      path: "/dashbord",
      layout: "./layouts/dashbord",
      user: req.user,
    });
  } else {
    res.render("user/dashbord", {
      pageTitle: req.user.admin ? "داشبور ادمین" : "پنل کاربری",
      path: "/dashbord",
      layout: "./layouts/dashbord",
      user: req.user,
    });
  }
};

exports.tamas = async (req, res) => {
  const payams = await Tamas.find();
  const funDate = (date) => {
    return jalaliMoment(date).locale("fa").format("D MMM YYYY");
  };
  res.render("admin/tamas", {
    pageTitle: "پیام ها",
    path: "/dashbord/tamas",
    layout: "./layouts/dashbord",
    payams,
    user: req.user,
    funDate,
  });
};

exports.tamasDelete = async (req, res) => {
  try {
    await Tamas.findByIdAndDelete(req.params.id);
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

exports.soalat = async (req, res) => {
  res.render("admin/soalat", {
    pageTitle: "مدیریت سوالات متداول",
    path: "/dashbord/tamas",
    layout: "./layouts/dashbord",
    user: req.user,
    solats: await Soalat.find(),
  });
};

exports.soalatAdd = async (req, res) => {
  try {
    await Soalat.create({ title: req.body.title, body: req.body.body });
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

exports.soalatDelete = async (req, res) => {
  try {
    await Soalat.findByIdAndRemove(req.params.id);
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

exports.khabarName = async (req, res) => {
  res.render("admin/khabarName", {
    pageTitle: "مدیریت خبر نامه",
    path: "dashbord/khabarName",
    layout: "./layouts/dashbord",
    user: req.user,
    emails: await KhabarName.find(),
    count: await KhabarName.count(),
  });
};

exports.khabarNameSendEmail = async (req, res) => {
  // code
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};

exports.productsAdd = (req, res) => {
  res.render("admin/productAdd", {
    pageTitle: "اضافه کردن محصول",
    path: "/dashbord/product/add",
    layout: "./layouts/dashbord",
    err: req.flash("err"),
    msg: req.flash("msg"),
    user: req.user,
  });
};

exports.productsAddServer = async (req, res) => {
  try {
    await Products.validateProduct(req.body);
    await Products.create({
      name: req.body.nameProduct,
      image: req.body.urlImage,
      ironPrice: req.body.ironPrice,
      washingPrice: req.body.washingPrice,
    });
    req.flash("msg", "عملیات موفقیت امیز بود");
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

exports.productimage = (req, res) => {
  const fileName = `${uid.rnd()}.png`;

  const upload = multer({
    limits: {
      fileSize: 5_000_000, //5MB,
    },
    fileFilter: (req, file, cb) => {
      if (path.extname(file.originalname) === ".png") {
        cb(null, true);
      } else {
        cb("لطفا png انتخاب کنید", false);
      }
    },
  }).single("image");

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      if (err.code == "LIMIT_FILE_SIZE") {
        res
          .status(400)
          .json({ msg: "حجم عکس بیشتر از 5 مگابایت است", fileName: null });
      }
      res.status(400).json({ msg: err, fileName: null });
    } else {
      if (req.file) {
        await sharp(req.file.buffer)
          .png({
            quality: 60,
          })
          .toFile(`./public/uploads/${fileName}`)
          .catch((err) => console.log(err));
        res.json({ msg: "اپلود موفقیت امیز بود", fileName });
      } else {
        res.status(400).json({ msg: "لطفا عکسی انتخاب کنید", fileName: null });
      }
    }
  });
};

exports.product = async (req, res) => {
  res.render("admin/product", {
    pageTitle: "لیست محصولات",
    path: "/dashbord/product/",
    layout: "./layouts/dashbord",
    user: req.user,
    products: await Products.find(),
  });
};

exports.deleteProduct = async (req, res) => {
  await Products.findByIdAndDelete(req.params.id);
  res.redirect("back");
};

exports.storefront = async (req, res) => {
  res.render("user/storefront", {
    pageTitle: "سفارش جدید",
    path: "/storefront",
    layout: "./layouts/dashbord",
    user: req.user,
    err: req.flash("err"),
    products: await Products.find(),
  });
};

exports.handelCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const product = user.cart.findIndex((item) => item.id == req.body.id);
    if (req.body.washing == 0 && req.body.iron == 0) {
      user.cart = user.cart.filter((item) => item.id != req.body.id);
    } else if (product != -1) {
      user.cart[product] = {
        id: req.body.id,
        washing: req.body.washing,
        iron: req.body.iron,
      };
    } else {
      user.cart.push({
        id: req.body.id,
        washing: req.body.washing,
        iron: req.body.iron,
      });
    }
    await User.findByIdAndUpdate(user.id, user);
  } catch (err) {
    console.log(err);
  }
};

exports.buy = async (req, res) => {
  if (req.user.cart.length > 0) {
    let cart = [];
    for (const c of req.user.cart) {
      let pro = await Products.findOne({ _id: c.id });
      cart.push(pro);
    }
    res.render("user/buy", {
      pageTitle: "ثبت سفارش",
      path: "/storefront",
      layout: "./layouts/dashbord",
      user: req.user,
      cart: cart,
      func: (number) => {
        number += "";
        number = number.replace(",", "");
        x = number.split(".");
        y = x[0];
        z = x.length > 1 ? "." + x[1] : "";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
        return y + z;
      },
      err: req.flash("err"),
    });
  } else {
    req.flash("err", ["لطفاً اول یکی از خدمات را به سبد خرید اضافه کنید!"]);
    res.redirect("back");
  }
};

exports.deleteItemCart = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  user.cart = user.cart.filter((c) => c.id != req.params.id);
  await User.findByIdAndUpdate(req.user.id, user);
  if (user.cart.length > 0) {
    res.redirect("back");
  } else {
    res.redirect("/dashbord/storefront");
  }
};

exports.handelBuy = async (req, res) => {
  try {
    await Sefaresh.validateSefaresh(req.body);
    await Sefaresh.create({
      user: req.user.id,
      cart: req.user.cart,
      name: req.body.name,
      phone: req.body.phone,
      locat: req.body.locat,
      locatText: req.body.locatText,
      day: req.body.day,
      time: req.body.time,
    });
    const user = await User.findOne({ _id: req.user.id });
    user.cart = [];
    await User.findByIdAndUpdate(req.user.id, user);
    res.render("user/sefareshResult", {
      pageTitle: "برسی سفارش",
      path: "/buyHandel",
      layout: "./layouts/dashbord",
      user: req.user,
    });
  } catch (err) {
    const error = [];
    err.errors.forEach((e) => {
      error.push(e);
    });

    req.flash("err", error);
    res.redirect("back");
  }
};

exports.baresi = async (req, res) => {
  const products = await Products.find();

  res.render("admin/baresi", {
    pageTitle: "برسی سفارش",
    path: "/dashbord/sefaresh/baresi",
    layout: "./layouts/dashbord",
    user: req.user,
    sefareshha: await Sefaresh.find({ status: "درحال برسی" }),
    func: (id) => {
      for (let p of products) {
        if (p.id == id) {
          return {
            name: p.name,
            ironPrice: p.ironPrice,
            washingPrice: p.washingPrice,
          };
        }
      }
    },
  });
};

exports.deleteSefaresh = async (req, res) => {
  try {
    await Sefaresh.findByIdAndRemove(req.params.id);
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

exports.userGPS = async (req, res) => {
  try {
    const sefaresh = await Sefaresh.findOne({ _id: req.params.id });
    res.render("admin/locat", {
      pageTitle: "نمایش در نقشه",
      path: "/loact",
      layout: "./layouts/none",
      user: req.user,
      lat: sefaresh.locat.split(",")[0],
      long: sefaresh.locat.split(",")[1],
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sendToBar = async (req, res) => {
  try {
    await Sefaresh.findByIdAndUpdate(req.params.id, {
      status: "دریافت مرصوله",
    });
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

exports.hamvanagl = async (req, res) => {
  const products = await Products.find();

  res.render("admin/bar", {
    pageTitle: "حمل و نقل",
    path: "/dashbord/sefaresh/hamvanagl",
    layout: "./layouts/dashbord",
    user: req.user,
    sefareshha: await Sefaresh.find({ status: "دریافت مرصوله" }),
    func: (id) => {
      for (let p of products) {
        if (p.id == id) {
          return {
            name: p.name,
            ironPrice: p.ironPrice,
            washingPrice: p.washingPrice,
          };
        }
      }
    },
  });
};

exports.darhalanjam = async (req, res) => {
  try {
    await Sefaresh.findByIdAndUpdate(req.params.id, {
      status: "درحال انجام",
    });
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
}

exports.darhamvanagl = async (req, res) => {
  const products = await Products.find();

  res.render("admin/darHalanjam", {
    pageTitle: "در حال انجام",
    path: "/dashbord/sefaresh/darhamvanagl",
    layout: "./layouts/dashbord",
    user: req.user,
    sefareshha: await Sefaresh.find({ status: "درحال انجام" }),
    func: (id) => {
      for (let p of products) {
        if (p.id == id) {
          return {
            name: p.name,
            ironPrice: p.ironPrice,
            washingPrice: p.washingPrice,
          };
        }
      }
    },
  });
};

exports.anjamShode = async (req, res) => {
  try {
    await Sefaresh.findByIdAndUpdate(req.params.id, {
      status: "انجام شده",
    });
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
}

exports.pageanjamshode = async (req, res) => {
  const products = await Products.find();

  res.render("admin/anjamShode", {
    pageTitle: "سفارش های انجام شده",
    path: "/dashbord/sefaresh/darhamvanagl",
    layout: "./layouts/dashbord",
    user: req.user,
    sefareshha: await Sefaresh.find({ status: "انجام شده" }),
    func: (id) => {
      for (let p of products) {
        if (p.id == id) {
          return {
            name: p.name,
            ironPrice: p.ironPrice,
            washingPrice: p.washingPrice,
          };
        }
      }
    },
  });
};
