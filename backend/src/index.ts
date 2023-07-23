import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { config } from "dotenv";

import userRouter from "./routes/user";
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
  app.use((req, res, next) => {
    const { url } = req;
    console.log(
      `Requesting Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      console.log(
        `Responding Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}] status:[${res.statusCode}]`
      );
    });
    next();
  });
  app.use("/user", userRouter);

  app.get("/", (req, res) => {
    res.send("Welcome to ATL DAY");
  });
  app.listen(8000, () => {
    console.log(`Listening at port 8000`);
  });
};
