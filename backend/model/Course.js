import mongoose from "mongoose";
import Joi from "joi";
// Define the Course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },

  prerequisites: String,
  credits: {
    type: Number,
    required: true,
  },

  objectives: [String],
  modules: [
    {
      moduleName: String,
      duration: Number,
      topics: String,
    },
  ],
  suggestedBooks: [String],
  courseOutcomes: String,
  branch: {
    type: String,
    enum: ["cs", "ce", "ee", "eee", "it", "me"],
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

// Create the Course model
const Course = mongoose.model("Course", courseSchema);

function validate(course) {
  const schema = Joi.object({
    title: Joi.string().required(),
    branch: Joi.string().min(2).max(3).required(),
    semester: Joi.number().max(8).min(1).required(),
    courseCode: Joi.string().required(),
    prerequisites: Joi.string(),
    credits: Joi.number().min(0).max(10).required(),
    objectives: Joi.array().items(Joi.string()),
    suggestedBooks: Joi.array().items(Joi.string()),
    courseOutcomes: Joi.string(),
    modules: Joi.array().items({
      moduleName: String,
      duration: Number,
      topics: String,
    }),
  });
  return schema.validate(course);
}

// Export the Course model
export { Course, validate };
