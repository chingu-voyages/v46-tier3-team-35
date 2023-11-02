const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

module.exports = mongoose.model("Like", likeSchema);
