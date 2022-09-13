const asyncHandler = require('express-async-handler')

const Airline = require('../model/airlineModel')

// @desc    Get airlines
// @route   GET /api/airlines
// @access Public
const getAirlines = asyncHandler(async (req,res) => {
    if(req.body.country){
        const airlines = await Airline.find({country: req.body.country}).populate('country');
        if(!airlines.length){
            res.status(200).json({message: "Nothing has been matched"})
        }
        res.status(200).json(airlines)
    }
    else{
        const airlines = await Airline.find().populate('country');
        res.status(200).json(airlines)
    }
    
    /* const airlines = await Airline.find();
    res.status(200).json(airlines) */
})

// @desc    Set airline
// @route   POST /api/airline
// @access Public
const setAirline = asyncHandler(async (req,res) => {
    if(!req.body){
        res.status(400)
        throw new Error("Error")
    }else if(!req.body.name){
        res.status(200).json({error : 'Please insert name'})
    }else if (!req.body.country){
        res.status(200).json({error : 'Please insert country'})
    }else{
        const airline = await Airline.create({
            name: req.body.name,
            country: req.body.country,
        })
        res.status(200).json(airline)
    }
    
})

// @desc    Update airline
// @route   PUT /api/airlines
// @access Public
const updateAirline = asyncHandler(async (req,res) => {
    const airline = await Airline.findById(req.params.id)

    if(!airline){
        res.status(400)
        throw new Error('Airport not found')
    }

    const updatedAirline = await Airline.findByIdAndUpdate(req.params.id, req.body, {new:true,})
    res.status(200).json(updatedAirline)
})

// @desc    Delete airline  
// @route   DELETE /api/airline
// @access Public
const deleteAirline = asyncHandler(async (req,res) => {
    const airline = await Airline.findById(req.params.id)
    console.log(airline)
    if(!airline){
        res.status(400)
        throw new Error('Airline not found')
    }

    await airline.remove()
    res.status(200).json({message : `Delete airline ${req.params.id}`})
})


module.exports = {
    getAirlines,
    setAirline,
    updateAirline,
    deleteAirline
}