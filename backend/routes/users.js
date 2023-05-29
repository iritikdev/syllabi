import { Router } from "express";
import { genSalt, hash } from "bcrypt";
import _ from "lodash";

import { User, validate } from "../model/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  // validating user
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await genSalt(10);
  user.password = await hash(req.body.password, salt);
  await user.save();

  const token = user.genrateAuthToken();
  console.log(token);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send(
      _.pick(user, ["_id", "name", "email", "verified", "admin", "avatar"])
    );
});

export default router;
