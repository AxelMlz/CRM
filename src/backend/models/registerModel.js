const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 100,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
    }
})

const Register = mongoose.model("register", registerSchema);

// exporter le modèle
module.exports = Register;