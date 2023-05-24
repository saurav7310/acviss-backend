const express = require("express");
const router = express.Router();
const Ads = require("../model/ads");

// for creating the ad data into the db

router.post("/", (req, res, next) => {
  const ad = new Ads({
    companyId: req.body.companyId,
    primaryText: req.body.primaryText,
    headline: req.body.headline,
    description: req.body.description,
  });
  ad.save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err, msg: "Ad post error" });
    });
});

module.exports = router;
