import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const PORT = 9005;

/**
 * schema import
 */
import "./models/insc.js";
//import "./get.js";

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mongodb connection
 */
const mongodbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dineshbabu292001:45GQ4xwdNUP2YgRq@cluster0.jcxnq0q.mongodb.net/",
      {}
    );
    console.log("mongodb connected");
    mongoose.connection.db
      .collection("movies")
      .createIndex(
        { movie: "text", directed: "text", hero: "text" },
        { name: "moviessearch" }
      );
  } catch (error) {
    return console.log("error", error);
  }
};

/**
 * routes import
 */

import post from "./routes/post.js";
import getSearch from "./get.js";

/**
 * routes call
 */

app.use("/post", post);
app.use("/get", getSearch);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongodbConnection();
});
