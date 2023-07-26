const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, require: true },
  title: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tag: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  deslike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
  BlogModel: mongoose.model("blog", Schema),
};
