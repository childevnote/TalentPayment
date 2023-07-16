import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  talent: {
    type: Number,
    required: true,
    default: 0,
    unique: false,
  },
  id: {
    // need to same with QR Data
    type: Number,
    min: 100000,
    max: 999999,
    default: 100000,
    required: true,
    unique: true
  }
});

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };
