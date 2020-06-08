const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
      name: String,
      favorites: [{type: Schema.Types.ObjectId, ref: "Note"}]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
