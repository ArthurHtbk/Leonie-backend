const mongoose = require("mongoose");

const Url = mongoose.model("Url", {
  name: {
    required: true,
    type: String,
  },
  url: String,
});

module.exports = Url;
