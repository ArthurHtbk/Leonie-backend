const mongoose = require("mongoose");

const Text = mongoose.model("Text", {
  name: {
    required: true,
    type: String,
  },
  EN: { strongEn: String, plainEn: String },
  FR: { strongFr: String, plainFr: String },
  DE: { strongDe: String, plainDe: String },
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = Text;
