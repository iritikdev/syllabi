import { Router } from "express";
import _ from "lodash";
import { Course, validate } from "../model/Course.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
});

router.get("/:branch/:semester", async (req, res) => {
  const { branch, semester } = req.params;
  const courses = await Course.find({ branch, semester });
  res.status(200).send(courses);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course(
    _.pick(req.body, [
      "title",
      "branch",
      "semester",
      "courseCode",
      "prerequisites",
      "credits",
      "objectives",
      "suggestedBooks",
      "courseOutcomes",
      "modules",
    ])
  );
  course = await course.save();
  res.send(course);
});

export default router;
