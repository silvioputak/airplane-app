const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const {connectDB} = require('./config/db')
const {createCountries} = require('./config/createCountries')
const { create } = require('./model/countryModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/airports', require('./routes/airportRoutes'));
app.use('/api/countries', require('./routes/countryRoutes'));
app.use('/api/airlines', require('./routes/airlinesRoutes'));

const conn = connectDB()
createCountries()
/* console.log(conn) */

app.use(errorHandler)



app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})