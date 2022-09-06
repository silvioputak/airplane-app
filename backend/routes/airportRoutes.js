const express = require('express')
const { set } = require('mongoose')
const router = express.Router()
const {getAirports,setAirport,updateAirport,deleteAirport} = require('../controllers/airportController')

/* router.get('/', getAirports)

router.post('/', setAirport)

router.put('/:id', updateAirport)

router.delete('/:id', deleteAirport) */
router.route('/').get(getAirports).post(setAirport)
router.route('/:id').put(updateAirport).delete(deleteAirport)

module.exports = router