import express from "express";
import bcrypt from "bcrypt";
import User from "../models/auth";
import mongoose from "mongoose";
import log from "../utils/logger/logger";

const router = express.Router();

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User successfully created"
          });
        })
        .catch(err => {
          log.error(err);
          res.status(500).json({
            error: err
          })
        });
    }
  });
});

export default router;
