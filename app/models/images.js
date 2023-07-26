const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  short_desc: { type: String, require: true },
  total_desc: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  deslike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  discount: { type: Number, default: 0 },
  type: { type: String, require: true },
  time: { type: String },
  format: { type: String },
  age: {
    type: Object,
    default: {
      from_age: "",
      to_age: "",
    },
  },
  feature: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      colors: [],
      model: [],
    },
  },
});

module.exports = {
  ImageModel: mongoose.model("image", Schema),
};
