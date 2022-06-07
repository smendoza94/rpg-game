const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt"); // encrypt passwords npm

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  hit_points: {
    type: Number,
    default: 5,
  },
  strength: {
    type: Number,
    default: 2,
  },
  monstersDefeated: [],
})
  // pre is mongoose version of "sequelize hooks" are functions that
  // are called before or after calls in mongoose
  // set up beforeCreate lifecycle pre-function functionality
  .pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
    return this;
  });
// .pre("findOneAndUpdate", async function () {
//   this.password = await bcrypt.hash(this.password, 10);
//   return this;
// })
// set up method to run on instance data (per user) to check password
UserSchema.methods.checkPassword = function (loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
};

const User = model("User", UserSchema);
module.exports = User;
