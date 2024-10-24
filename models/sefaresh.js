const mongoose = require("mongoose");
const yup = require("yup");

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    max: 100,
  },
  phone: {
    type: String,
    required: true,
  },
  locat: {
    type: String,
    required: true,
  },
  locatText: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ["شنبه", "دوشنبه", "چهارشنبه"],
    required: true,
  },
  time: {
    type: String,
    default: "16 تا 18",
    required: true
  },
  status: {
    type: String,
    enum: ["درحال برسی", "دریافت مرصوله", "انجام شده", "درحال انجام"],
    default: "درحال برسی"
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

schema.statics.validateSefaresh = function (body) {
  return yup.object().shape({
    name: yup
      .string()
      .required("اسم اجباری است")
      .max(100, "طول فیلد اسم زیاد است")
      .trim(),
    phone: yup
      .string()
      .required("شماره مبایل شما اجباری است")
      .matches("^(\\+98|0)?9\\d{9}$", "فرمت شماره شما درست نیست"),
    locat: yup.string().required("لطفا ادرس خود را در جی پی اس مشخص کنید"),
    locatText: yup
      .string()
      .required("متنی برای پیدا کردن بهتر ادرس بنویسید")
      .max(255),
    day: yup.mixed().oneOf(["شنبه", "دوشنبه", "چهارشنبه"], "لطفا یکی از روز ها را انتخاب کنید"),
    time: yup.mixed().oneOf(["16 تا 18"] ,"ساعتی انتخاب کنید")
  }).validate(body, {
    abortEarly: false
  });
};

module.exports = mongoose.model("Sefaresh", schema);
