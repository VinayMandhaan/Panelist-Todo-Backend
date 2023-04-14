const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: Boolean
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