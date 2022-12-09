import { Schema, model } from "mongoose";

const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viwedProfile: Number,
    impressions: Number,
  },
  { timestaps: true }
);

const User = model("User", UserSchema);
export default User;
