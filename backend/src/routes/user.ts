import { Router } from "express";
import USER from "../models/User";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "please enter all the fields",
    });
  }

  const User = new USER({ name, email, password });
  try {
    const result = await User.save();
    if (result) {
      return res.status(201).json({ success: true, user: result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: String(err),
    });
  }
});

export default userRouter;
