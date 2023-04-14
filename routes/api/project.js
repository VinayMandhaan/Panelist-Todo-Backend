const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Task = require("../../models/Task");
const Project = require("../../models/Project");

router.post("/", auth, async (req, res) => {
    const { name, description, taskId } = req.body;
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newProject = new Project({
            user:req.user.id,
            name,
            description,
            status:false,
            taskId:taskId ? taskId : null
        });
        const project = await newProject.save();
        return res.json({ project, status: 200 });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/user/:id", auth, async (req, res) => {
    try {
      const project = await Project.find({ user: req.params.id }).populate("user")
      return res.json({ project, status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: "User not authorized" });
      }
      await project.deleteOne();
      return res.json({ msg: "Project Deleted", status: 200 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});

router.post('/update/:id', auth, async (req, res) => {
    const { name, status, description } = req.body
    try {
      var project = await Project.findById(req.params.id);
      if (!task) {
        return res.json({ msg: 'No Project Found' })
      }
      project.name = name ? name : project.name;
      project.status = status ? status : project.status;
      project.description = description ? description : project.description;

      await project.save();
      return res.json({ msg: "Project Updated", task });
  
    } catch (err) {
      console.log(err)
      res.status(500).send("Server Error")
    }
})


module.exports = router
