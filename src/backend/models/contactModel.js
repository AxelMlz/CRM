const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 42,
    },
    email: {
        type: String,
        maxLength: 40,
        unique: true,
    },
    description: {
        type: String,
        minLength: 8,

    },
    registerId: [{
        type: mongoose.Types.ObjectId, ref: "Register"
    }],
    category: {
        type: Number
    }

})

const Contact = mongoose.model("Contact", contactSchema);

// exporter le modèle
module.exports = Contact;