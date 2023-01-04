import express from "express";
import * as dotenv from "dotenv";
import log from "./utils/logger/logger";
import mongoose from "mongoose";
import userRoutes from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// routes
app.use("/auth", userRoutes);

app.listen(port, () => log.info(`API UP! (on port ${port})`))

mongoose.set("strictQuery", false);
// @ts-ignore
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  log.info("Connected to cluster");
});

mongoose.connection.on("error", err => {
  log.error(err);
});

app.get("/", (req, res) => {
  res.send("hi");
});
