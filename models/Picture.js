const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  hero: Boolean,
  name: {
    required: true,
    type: String,
  },
});

module.exports = Picture;
