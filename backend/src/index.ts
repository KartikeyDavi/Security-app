import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { config } from "dotenv";
config();

const app = express();

connect(process.env.MONGODB_URL || "")
  .then(() => {
    console.log("Connected to db");
    startServer();
  })
  .catch((err) => {
    console.log(err);
  });

const startServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Welcome to ATL DAY");
  });
  app.listen(8000, () => {
    console.log(`Listening at port 8000`);
  });
};
