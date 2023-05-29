import { Router } from "express";
import { compare } from "bcrypt";
import _ from "lodash";
import Joi from "joi";

import { User } from "../model/User.js";

const router = Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password.");

  const token = user.genrateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(user);
}

export default router;
