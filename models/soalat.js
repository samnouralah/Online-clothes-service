const mongoose = require("mongoose")
const yup = require("yup")

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
})

// const schemaYup = yup.object().shape({
//     title: yup.string().required("فیلد عنوان اجباری است"),
//     body: yup.string().required("فیلد پاسخ اجباری است")
// })

// Schema.statics.vYup = function(body){
//     return schemaYup.validate(body, {
//         abortEarly: false
//     })
// }

module.exports = mongoose.model("Soalat", Schema)