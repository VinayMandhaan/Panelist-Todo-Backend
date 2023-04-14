const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Task = require("../../models/Task");

router.post("/", auth, async (req, res) => {
    const { name, dueDate, description, reminder } = req.body;
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newTask = new Task({
            user:req.user.id,
            name,
            dueDate,
            status: false,
            description,
            reminder
        });
        const task = await newTask.save();
        return res.json({ task, status: 200 });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/user", auth, async (req, res) => {
    try {
      const task = await Task.find({ user: req.user.id }).populate("user")
      return res.json({ task, status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (task.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "User not authorized" });
      }
      await task.deleteOne();
      return res.json({ msg: "Task Deleted", status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});

router.post('/update/:id', auth, async (req, res) => {
    const { name, dueDate, reminder, status, description } = req.body
    try {
      var task = await Task.findById(req.params.id);
      if (!task) {
        return res.json({ msg: 'No Task Found' })
      }
      task.name = name ? name : task.name;
      task.status = status ? status : task.status;
      task.description = description ? description : task.description;
      task.reminder = reminder ? reminder : task.reminder
      task.dueDate = dueDate ? dueDate : task.dueDate

      await task.save();
      return res.json({ msg: "Task Updated", task });
  
    } catch (err) {
      console.log(err)
      res.status(500).send("Server Error")
    }
})


module.exports = router