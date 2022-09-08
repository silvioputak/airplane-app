const express = require('express')
const router = express.Router()
const {getAirlines,setAirline,updateAirline,deleteAirline} = require('../controllers/airlineController')

router.route('/').get(getAirlines).post(setAirline)
router.route('/:id').put(updateAirline).delete(deleteAirline)

module.exports = router