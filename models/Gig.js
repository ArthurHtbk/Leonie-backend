const mongoose = require("mongoose");

const Gig = mongoose.model("Gig", {
  name: {
    required: true,
    type: String,
  },
  slug: String,
  band: String,
  date: String,
  place: String,
  contact: String,
  description: {
    EN: String,
    FR: String,
    DE: String,
  },
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = Gig;
