const express = require("express");
const router = express.Router();
const Companies = require("../model/companies");
const Ads = require("../model/ads");

// for creating the companines not using in frontend created used for creating compamy collection via postman

router.post("/", (req, res, next) => {
  const company = new Companies({
    name: req.body.name,
    url: req.body.url,
  });
  company
    .save()
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ err, msg: "Company post rqst not worked" });
    });
});

// for searching the specific data not using this one

router.post("/search", async (req, res, next) => {
  try {
    const { searchText } = req.body;

    const filteredData = await Companies.aggregate([
      {
        $lookup: {
          from: "ads",
          localField: "_id",
          foreignField: "companyId",
          as: "ads",
        },
      },
      {
        $unwind: "$ads",
      },
      {
        $match: {
          $or: [
            { name: searchText },
            { "ads.primaryText": searchText },
            { "ads.headline": searchText },
            { "ads.description": searchText },
          ],
        },
      },
    ]);

    res.status(200).json(filteredData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// for fetching all data from db

// router.get("/all", async (req, res, next) => {
//   try {
//     const result = await Ads.find();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// getting all the attached data of both collections using this one for getting all data

router.get("/getAll", async (req, res, next) => {
  try {
    const filteredData = await Companies.aggregate([
      {
        $lookup: {
          from: "ads",
          localField: "_id",
          foreignField: "companyId",
          as: "ads",
        },
      },
      {
        $unwind: "$ads",
      },
    ]);

    res.status(200).json(filteredData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
