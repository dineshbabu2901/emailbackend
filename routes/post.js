import { Router } from "express";
import mongoose, { Schema, now } from "mongoose";
// import MovieCollection from "../models/insc.js";

const MovieCollection = mongoose.model("Movie");
const app = Router();

app.post("/movieslist", async (req, res) => {
  try {
    const { movie, directed, year, hero } = req.body;
    console.log(movie, directed, year, hero);

    const newUser = new MovieCollection({ movie, directed, year, hero });
    await newUser.save();

    const searchText = "justin";
    const searchResult = await MovieCollection.aggregate([
      {
        $search: {
          text: {
            query: searchText,
            path: "movie",
          },
        },
      },
      { $limit: 1 },
    ]);
    console.log(searchResult);

    res.status(200).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
