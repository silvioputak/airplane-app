const mongoose = require('mongoose')

const airportSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please add a name value']
    },
    country : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Country'
    },
    location: {
        type: String,
        required: [true, 'Please add gps cordinates']
    },
    airline : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airline'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Airport', airportSchema)