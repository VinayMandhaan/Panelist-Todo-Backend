const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }
})

module.exports = Project = mongoose.model('project', ProjectSchema)