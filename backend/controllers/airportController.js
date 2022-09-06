const asyncHandler = require('express-async-handler')
// @desc    Get airports
// @route   GET /api/airports
// @access Public
const getAirports = asyncHandler(async (req,res) => {
   
    res.status(200).json({message : 'Get airports'})
})

// @desc    Set airport
// @route   POST /api/airports
// @access Public
const setAirport = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text filed")
    }
    res.status(200).json({message : 'Create airport'})
})

// @desc    Update airport
// @route   PUT /api/airports
// @access Public
const updateAirport = asyncHandler(async (req,res) => {
    res.status(200).json({message : `Update airport ${req.params.id}`})
})

// @desc    Delete airport
// @route   DELETE /api/goals
// @access Public
const deleteAirport = asyncHandler(async (req,res) => {
    res.status(200).json({message : `Delete airport ${req.params.id}`})
})


module.exports = {
    getAirports,
    setAirport,
    updateAirport,
    deleteAirport
}