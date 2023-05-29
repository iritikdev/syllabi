import { Schema, model } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: { type: String },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
  return token;
};

const User = model("User", userSchema);
function validate(user) {
  const schema = Joi.object({
    avatar: Joi.string(),
    name: Joi.string().min(3).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(16).required(),
    verified: Joi.boolean().default(false),
    verificationCode: Joi.string(),
    admin: Joi.boolean().default(false),
  });
  return schema.validate(user);
}

export { User, validate };
