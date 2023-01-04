import express from "express";
import User from "../models/auth";
import mongoose from "mongoose";
import argon2 from "argon2";
import log from "../utils/logger/logger";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const hash = await argon2.hash(req.body.password);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User successfully created",
      });
    })
    .catch((err) => {
      log.error(err);
      res.status(500).json({
        error: err,
      });
    });
});

export default router;
