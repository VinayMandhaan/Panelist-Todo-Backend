const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    status: {
        type: Boolean
    },
    dueDate: {
        type: Date
    },
    description: {
        type: String
    },
    reminder: {
        type: Boolean
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)