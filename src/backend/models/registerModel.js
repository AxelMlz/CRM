const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 40,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,

    },
    contact: [{
        type: mongoose.Types.ObjectId, ref: "Register"
    }]

})

const Register = mongoose.model("Register", registerSchema);

// exporter le modèle
module.exports = Register;