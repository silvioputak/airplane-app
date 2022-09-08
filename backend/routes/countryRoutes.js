const express = require('express')
const { set } = require('mongoose')
const router = express.Router()
const {getCountryes,setCountry,updateCountry,deleteCountry} = require('../controllers/countryController')

/* router.get('/', getAirports)

router.post('/', setAirport)

router.put('/:id', updateAirport)

router.delete('/:id', deleteAirport) */
router.route('/').get(getCountryes).post(setCountry)
router.route('/:id').put(updateCountry).delete(deleteCountry)

module.exports = router