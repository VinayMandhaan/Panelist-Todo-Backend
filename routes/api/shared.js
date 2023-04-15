const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Task = require("../../models/Task");
const Project = require("../../models/Project");
const Shared = require("../../models/Shared");

router.post("/", auth, async (req, res) => {
    const { taskId, userId } = req.body;
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newShared = new Shared({
            sender:req.user.id,
            user:userId,
            taskId:taskId
        });
        const shared = await newShared.save();
        return res.json({ shared, status: 200 });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/user", auth, async (req, res) => {
    try {
      const sharedTask = await Shared.find({ user: req.user.id }).populate("user").populate('taskId').populate('sender')
      return res.json({ sharedTask, status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});

router.get("/my", auth, async (req, res) => {
    try {
      const sharedTask = await Shared.find({ sender: req.user.id }).populate("user").populate('taskId').populate('sender')
      return res.json({ sharedTask, status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});

module.exports = router
