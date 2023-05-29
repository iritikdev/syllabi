import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(console.log(`Database is connected ⚡`));
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
}
