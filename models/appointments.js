const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    service: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);