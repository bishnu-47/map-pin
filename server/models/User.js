import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: [true, "Username must be unique"],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Email already in use"],
    },
    password: {
      type: String,
      require: true,
      min: [6, "password length must be more than 6"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
