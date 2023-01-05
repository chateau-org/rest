import express from "express";
import User from "../models/auth";
import mongoose from "mongoose";
import argon2 from "argon2";
import validator from "validator";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const router = express.Router();

dotenv.config();

router.post("/", async (req, res) => {
  const hash = await argon2.hash(req.body.password);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
  });
  if (validator.isEmail(user.email) === true) {
    user
      .save()
      .then((result) => {
        // @ts-ignore
        const jwtToken = jwt.sign({ data: result }, process.env.JWT_TOKEN, {
          expiresIn: "1h",
        });
        res.status(201).json({
          message: "User sucessfully created"
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
