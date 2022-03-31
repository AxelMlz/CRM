const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 60,
    },
    email: {
        type: String,
        maxLength: 100,
        unique: true,
    },
    description: {
        type: String,
        maxLength: 300,
    },
    registerId: [{
        type: mongoose.Types.ObjectId, ref: "register"
    }],
    category: {
        type: Number
    }

})

const Contact = mongoose.model("contact", contactSchema);

// exporter le modèle
module.exports = Contact;