const mongoose = require('mongoose')

const airlineSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please add a name value']
    },
    country : {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add country value'],
        ref: 'Country'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Airline', airlineSchema)