import { Router } from "express";
import bcrypt from "bcryptjs";
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
    const userExists = await USER.findOne({ email });
    if (userExists)
      return res.status(400).json({
        message: "Email already exists",
      });
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

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Please enter all the fields",
    });
  try {
    const user = await USER.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid email or password",
      });

    const passwordsMatch = bcrypt.compare(password, user.password);
    if (!passwordsMatch)
      return res.status(400).json({
        message: "Invalid email or password",
      });
    return res.status(200).json({
      success: true,
      user,
      message: "Logged In Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: String(err),
    });
  }
});

export default userRouter;
