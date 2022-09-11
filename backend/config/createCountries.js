const Country = require('../model/countryModel')
const {countries} = require('./countriesArray')


const createCountries = async () => {
    const listCountries = await Country.find();
    if(!listCountries.length){
        Country.insertMany(countries)
        .then(console.log("Country data inserted"))
        .catch((err) => console.log(err));
    }
    else{
        console.log("Country data is already in database")
    }
    
}
module.exports = {
    createCountries
}