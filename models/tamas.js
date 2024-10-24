const mongoose = require("mongoose");
const yup = require("yup");

const TamasSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const yupTamaseSchema = yup.object().shape({
  name: yup
    .string()
    .required("فیلد اسم اجباری است")
    .max(30, "تعداد کاراکتر های اسم زیاد است"),
  email: yup
    .string()
    .email("ایمیل را برسی کنید")
    .required("فیلد ایمیل اجباری است"),
  text: yup.string().required("فیلد متن اجباری است").max(1_000, "تعداد کاراکتر های متن زیاد است")
});

TamasSchema.statics.yupV = function(body){
    return yupTamaseSchema.validate(body, {
        abortEarly: false
    })
}

module.exports = mongoose.model("Tamas", TamasSchema);