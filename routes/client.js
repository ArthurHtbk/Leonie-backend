const express = require("express");
const router = express.Router();

const Picture = require("../models/Picture");
const Text = require("../models/Text");
const Gig = require("../models/Gig");
const Url = require("../models/Url");

router.get("/client/pictures", async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.status(200).json(pictures);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/hero", async (req, res) => {
  try {
    const hero = await Picture.findOne({ hero: true });
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/text", async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json(texts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/gigs", async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/gigs/:slug", async (req, res) => {
  try {
    const gig = await Gig.findOne(req.params);
    res.status(200).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/urls", async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
