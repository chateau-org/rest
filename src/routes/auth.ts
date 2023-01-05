import express from "express";
import User from "../models/auth";
import mongoose from "mongoose";
import argon2 from "argon2";
import validator from "validator";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const hash = await argon2.hash(req.body.password);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
  });
  if (validator.isEmail(user.email) === true) {
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User successfully created",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(400).json({
      message: "Invalid email address",
    });
  }
});

export default router;
