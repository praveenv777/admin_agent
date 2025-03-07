const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true,
    },
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;