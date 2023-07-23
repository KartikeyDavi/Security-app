import { Router } from "express";
import Device from "../models/Device";
const deviceRouter = Router();

deviceRouter.post("/register", async (req, res) => {
  const { id } = req.body;
  const deviceExists = await Device.findOne({ dId: id });
  if (deviceExists)
    return res.status(201).json({ success: true, device: deviceExists });

  if (!id)
    return res.json({
      status: false,
      message: "No id provided",
    });
  try {
    const device = new Device({
      dId: id,
    });
    const result = await device.save();
    return res.status(201).json({ success: true, device: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
});

export default deviceRouter;
