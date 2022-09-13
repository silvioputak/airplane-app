import axios from 'axios'

/* const API_URL = '/api/' */

const getAirports = async (setCountries) => {
    try{
        const response = await axios.get('/api/airports')
        setCountries(response.data)  
    }catch(err){
        console.log(err)
    }
       
}

export {getAirports}