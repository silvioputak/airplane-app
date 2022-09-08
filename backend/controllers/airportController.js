const asyncHandler = require('express-async-handler')

const Airport = require('../model/airportModel')

// @desc    Get airports
// @route   GET /api/airports
// @access Public
const getAirports = asyncHandler(async (req,res) => {
    const airports = await Airport.find();
    res.status(200).json(airports)
})

// @desc    Set airport
// @route   POST /api/airports
// @access Public
const setAirport = asyncHandler(async (req,res) => {
    if(!req.body){
        res.status(400)
        throw new Error("Error")
    }
    const airport = await Airport.create({
        name: req.body.name,
        country: req.body.country,
        location: req.body.location,
        airline: req.body.airline
    })
    console.log("jebiga")
    res.status(200).json(airport)
})

// @desc    Update airport
// @route   PUT /api/airports
// @access Public
const updateAirport = asyncHandler(async (req,res) => {
    const airport = await Airport.findById(req.params.id)

    if(!airport){
        res.status(400)
        throw new Error('Airport not found')
    }

    const updatedAirport = await Airport.findByIdAndUpdate(req.params.id, req.body, {new:true,})
    res.status(200).json(updatedAirport)
})

// @desc    Delete airport
// @route   DELETE /api/goals
// @access Public
const deleteAirport = asyncHandler(async (req,res) => {
    const airport = await Airport.findById(req.params.id)

    if(!airport){
        res.status(400)
        throw new Error('Airport not found')
    }

    await airport.remove()
    res.status(200).json({message : `Delete airport ${req.params.id}`})
})


module.exports = {
    getAirports,
    setAirport,
    updateAirport,
    deleteAirport
}