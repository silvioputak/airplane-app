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

const setAirport = async (name,country,location,airline) => {
    try{
        const response = await axios.post('/api/airports', {
            name : name,
            country : country,
            location : location,
            airline: airline
        })
        return response
    }catch(err){
        console.log(err)
    }
       
}

const deleteAirport = async (id) => {
    const url = '/api/airports/' + id;
    
    try{
        const response = await axios.delete(url)
        return response
          
    }catch(err){
        console.log(err)
    }
       
}

const updateAirport = async (id, name, country,location,airline) => {
    const url = '/api/airports/' + id;

    try{
        const response = await axios.put(url, {
            name : name,
            country : country,
            location : location,
            airline: airline
        })
        return response
          
    }catch(err){
        console.log(err)
    }
       
}

export {getAirports, setAirport, deleteAirport, updateAirport}