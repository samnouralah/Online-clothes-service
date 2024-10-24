const mongoose = require("mongoose");
const yup = require("yup");
 
const SchemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    trim: true,
    default: [],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const yupSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(4, "حداقل تعداد نام کاربری 4 کاراکتر است")
    .max(30, "حداکثر تعداد کاراکتر های نام کاربری 30 تا است")
    .required("فیلد نام کاربری اجباری است"),
  email: yup
    .string()
    .email("فیلد ایمیل را چک کنید")
    .required("فیلد ایمیل اجباری است"),
  password: yup
    .string()
    .min(6, "حداقل تعداد کاراکتر های رمز عبور 6  تا است")
    .required("فیلد رمز عبور اجباری است"),
  confirmPassword: yup
    .string()
    .required("تکرار کلمه عبور اجباری است")
    .oneOf([yup.ref("password"), null], "رمز عبور و تکرار ان مثل هم نیستند"),
});

SchemaUser.statics.yupV = function(body){
    return yupSchema.validate(body, {
        abortEarly: false
    })
}

module.exports = mongoose.model("User", SchemaUser)