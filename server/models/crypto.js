const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
    name: { type: String, required: true },
    image: {
        type: String,
        required: true,
    },
    cateogry: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Crypto", cryptoSchema);