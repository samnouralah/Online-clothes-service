const mongoose = require("mongoose")
const yup = require("yup")

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true, 
    },
    ironPrice: {
        type: String,
        required: true,
    },
    washingPrice: {
        type: String,
        required: true
    }
})

Schema.statics.validateProduct = function(body) {
    return yup.object().shape({
        nameProduct: yup.string().required('فیلد اسم محصول اجباری است').trim(),
        urlImage: yup.string().required("باید عکسی اپلود کنید"),
        ironPrice: yup.string().required("باید قیمتی برای اتو معین کنید"),
        washingPrice: yup.string().required("باید قیمتی برای شست و شو معین کنید")
    }).validate(body, {
        abortEarly: false
    })
}

module.exports = mongoose.model("Product", Schema)