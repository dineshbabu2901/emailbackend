import { Router } from "express";
import mongoose from "mongoose";

const Movie = mongoose.model("Movie");

const app = Router();

app.get("/movies/search/:keyword", async (req, res) => {
  try {
    const movies = req.params.keyword;

    const aggregationResult = await Movie.aggregate([
      // {
      //   $match: {
      //     index: "moviessearch",
      //     movie: {
      //       $regex: `.*${movies}.*`,
      //       $options: "i",
      //     },
      //   },
      // },

      // {
      //   $search: {
      //     index: "moviessearch",
      //     compound: {
      //       must: [
      //         {
      //           wildcard: {
      //             query: `*${movies}*`,
      //             path: "movie",
      //           },
      //         },
      //       ],
      //     },
      //     caseSensitive: true,
      //   },
      // },
      // {
      //   $search: {
      //     index: "moviessearch",
      //     text: {
      //       query: "jhon wick",
      //       path: ["movie", "directed", "hero"],
      //     },
      //   },
      // },
      // {
      //   $match: {
      //     hero: "ken",
      //   },
      // },
      // {
      //   $sort: {
      //     year: -1,
      //   },
      // },
      // {
      //   $limit: 3,
      // },
      // {
      //   $project: {
      //     title: 1,
      //     author: 1,
      //     genre: 1,
      //     Year: 1,
      //   },
      // },

      // {
      //   $search: {
      //     index: "moviessearch",
      //     text: {
      //       query: `*${jhonwick}*`, //"*Jho*wick*",
      //       path: ["movie", "directed", "hero"],
      //     },
      //   },
      // },

      {
        $search: {
          index: "moviessearch",
          compound: {
            must: {
              wildcard: {
                query: "jhonwick",
                path: {
                  wildcard: "*",
                },
                allowAnalyzedField: true,
              },
            },
          },
        },
      },

      // $search: {
      //   index: "moviessearch",
      //   compound: {
      //     must: [
      //       {
      //         wildcard: {
      //           query: `*jhonwick*`,
      //           path: ["movie", "directed", "hero"],
      //         },
      //       },
      //     ],
      //   },
      // },
    ]);

    console.log(aggregationResult);

    res.status(200).json({
      message: "Autocomple successfully",
      keyword: movies,
      result: aggregationResult,
    });
  } catch (error) {
    console.error("Error executing Text Search Aggregation Pipeline:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;

// const test = async () => {
//   const agg = [
//     {
//       $search: {
//         index: "moviessearch",
//         compound: {
//           must: [
//             {
//               wildcard: {
//                 query: `*jhonwick*`,
//                 path: ["movie", "directed", "hero"],
//               },
//             },
//           ],
//         },
//       },
//     },
//   ];

//   const found = await Movie.aggregate(agg);
//   console.log("found", found);
// };

// test();
