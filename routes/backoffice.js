const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const Picture = require("../models/Picture");
const Text = require("../models/Text");
const Gig = require("../models/Gig");

const options = {
  replacement: "-",
  lower: true,
  strict: true,
};

router.post("/backoffice/login", (req, res) => {
  try {
    if (req.fields.password === process.env.BACKOFFICE_PASSWORD) {
      res.status(200).json({ token: process.env.BACKOFFICE_TOKEN });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/picture/create", async (req, res) => {
  try {
    if (!req.fields.name) {
      res
        .status(400)
        .json("You must fill out the name field in order to upload a picture!");
    } else if (!req.files.image) {
      res.status(400).json("No picture uploaded!");
    } else {
      const newPicture = new Picture({
        hero: false,
        name: req.fields.name,
      });
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: `/leonie/picture/${newPicture._id}`,
      });
      newPicture.image = result;
      await newPicture.save();
      res.status(200).json(newPicture);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/picture/hero", async (req, res) => {
  try {
    const hero = await Picture.findOne({ hero: true });
    if (!hero) {
      const newHero = await Picture.findById(req.fields._id);
      newHero.hero = true;
      await newHero.save();
      res.status(200).json(newHero);
    } else {
      const newHero = await Picture.findById(req.fields._id);
      if (newHero.hero) {
        hero.hero = false;
        await hero.save();
        res.status(200).json(hero);
      } else {
        hero.hero = false;
        await hero.save();
        newHero.hero = true;
        await newHero.save();
        res.status(200).json(newHero);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/picture/delete", async (req, res) => {
  try {
    await Picture.findByIdAndDelete(req.fields._id);
    res.status(200).json("Successfully deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/text/create", async (req, res) => {
  try {
    if (!req.fields.name) {
      res
        .status(400)
        .json("You must fill out the name field in order to upload text!");
    } else {
      const newText = new Text({
        name: req.fields.name,
        EN: {
          strongEn: req.fields.strongEn,
          plainEn: req.fields.plainEn,
        },
        FR: {
          strongFr: req.fields.strongFr,
          plainFr: req.fields.plainFr,
        },
        DE: {
          strongDe: req.fields.strongDe,
          plainDe: req.fields.plainDe,
        },
      });
      if (req.files.image) {
        const result = await cloudinary.uploader.upload(req.files.image.path, {
          folder: `/leonie/text/${newText._id}`,
        });
        newText.image = result;
      }
      await newText.save();
      res.status(200).json(newText);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/text/update", async (req, res) => {
  try {
    const text = await Text.findById(req.fields._id);
    if (req.fields.name) {
      text.name = req.fields.name;
    }
    if (req.fields.strongEn) {
      text.EN.strongEn = req.fields.strongEn;
    }
    if (req.fields.plainEn) {
      text.EN.plainEn = req.fields.plainEn;
    }
    if (req.fields.strongFr) {
      text.FR.stronFr = req.fields.strongFr;
    }
    if (req.fields.plainFr) {
      text.FR.plainFr = req.fields.plainFr;
    }
    if (req.fields.strongDe) {
      text.DE.strongDe = req.fields.strongDe;
    }
    if (req.fields.plainDe) {
      text.DE.plainDe = req.fields.plainDe;
    }
    if (req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: `/leonie/text/${text._id}`,
      });
      text.image = result;
    }
    await text.save();
    res.status(200).json(text);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/text/delete", async (req, res) => {
  try {
    await Text.findByIdAndDelete(req.fields._id);
    res.status(200).json("Successfully deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/gig/create", async (req, res) => {
  try {
    if (!req.fields.name) {
      res
        .status(400)
        .json("You must fill out the name field in order to upload a concert!");
    } else {
      const newGig = new Gig({
        name: req.fields.name,
        slug: slugify(req.fields.name, options),
        band: req.fields.band,
        date: req.fields.date,
        place: req.fields.place,
        contact: req.fields.contact,
        description: {
          EN: req.fields.EN,
          FR: req.fields.FR,
          DE: req.fields.DE,
        },
      });
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: `/leonie/gig/${newGig._id}`,
      });
      newGig.image = result;
      await newGig.save();
      res.status(200).json(newGig);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/gig/update", async (req, res) => {
  try {
    const gig = await Gig.findById(req.fields._id);
    if (req.fields.name) {
      gig.name = req.fields.name;
      gig.slug = slugify(req.fields.name, options);
    }
    if (req.fields.contact) {
      gig.contact = req.fields.contact;
    }
    if (req.fields.band) {
      gig.band = req.fields.band;
    }
    if (req.fields.date) {
      gig.date = req.fields.date;
    }
    if (req.fields.place) {
      gig.place = req.fields.place;
    }
    if (req.fields.EN) {
      gig.description.EN = req.fields.EN;
    }
    if (req.fields.FR) {
      gig.description.FR = req.fields.FR;
    }
    if (req.fields.DE) {
      gig.description.DE = req.fields.DE;
    }
    if (req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: `/leonie/gig/${gig._id}`,
      });
      gig.image = result;
    }
    await gig.save();
    res.status(200).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/backoffice/gig/delete", async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.fields._id);
    res.status(200).json("Successfully deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
