const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 42,
    },
    surname: {
        type: String,
        required: true,
        maxLength: 42,
    },
    email: {
        type: String,
        required: true,
        maxLength: 40,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,

    },

})

const Register = mongoose.model("Register", registerSchema);

// exporter le modèle
module.exports = Register;