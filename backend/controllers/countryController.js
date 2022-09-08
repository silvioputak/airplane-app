const asyncHandler = require('express-async-handler')

const Country = require('../model/countryModel')

// @desc    Get countryes
// @route   GET /api/countries
// @access Public
const getCountryes = asyncHandler(async (req,res) => {
    const country = await Country.find();
    res.status(200).json(country)
})

// @desc    Set country
// @route   POST /api/countries
// @access Public
const setCountry = asyncHandler(async (req,res) => {
    if(!req.body){
        res.status(400)
        throw new Error("Error")
    }
    const country = await Country.create({
        code: req.body.code,
        name: req.body.name,
    })
    res.status(200).json(country)
})

// @desc    Update country
// @route   PUT /api/countries
// @access Public
const updateCountry = asyncHandler(async (req,res) => {
    const country = await Country.findById(req.params.id)

    if(!country){
        res.status(400)
        throw new Error('Country not found')
    }

    const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, {new:true,})
    res.status(200).json(updatedCountry)
})

// @desc    Delete country
// @route   DELETE /api/countries
// @access Public
const deleteCountry = asyncHandler(async (req,res) => {
    const country = await Airport.findById(req.params.id)

    if(!country){
        res.status(400)
        throw new Error('Airport not found')
    }

    await country.remove()
    res.status(200).json({message : `Delete airport ${req.params.id}`})
})


module.exports = {
    getCountryes,
    setCountry,
    updateCountry,
    deleteCountry
}