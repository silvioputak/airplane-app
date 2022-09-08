const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
    code : {
        type: String,
        required: [true, 'Please add country code']
    },
    name : {
        type: String,
        required: [true, 'Please country name']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Country', countrySchema)