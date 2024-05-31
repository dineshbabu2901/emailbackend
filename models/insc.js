import mongoose, { Schema, now } from "mongoose";

const movie = new Schema({
  movie: {
    type: String,
    required: true,
  },
  directed: {
    type: String,
    required: true,
  },
  hero: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Movie", movie);
