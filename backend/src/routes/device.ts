import { Router } from "express";
import USER from "../models/User";
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

deviceRouter.post('/sign', async(req, res)=>{
    const userId = req.headers.authorization?.split(" ")[1];
    if(!userId) return res.status(200).json({
        success:false,
        message:"Not authorized"
    })
    const {name, id} = req.body;
    if(!name || !id){
        return res.status(200).json({
            success:false,
            message:"Please provide all the fields",
        })
    }
    try{
        const device = await Device.findOne({dId:id})
        if(!device) return res.status(200).json({
            success:false,
            message:"device not found"
        })
        const result = await USER.updateOne({_id:userId}, {
            $push:{
                devices:{
                    name,
                    id,
                }
            }
        }, {new:true})
        return res.status(200).json({
            success:true,
            user:result,
        })

    }catch(err){
        console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
    }
})

deviceRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findOne({ dId: id });
    return res.status(200).json({
      success: true,
      device,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
});

export default deviceRouter;
