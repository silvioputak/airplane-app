import axios from 'axios'

/* const API_URL = '/api/' */

const getCountries = async (setCountries) => {
    try{
        const response = await axios.get('/api/countries')
        setCountries(response.data)  
    }catch(err){
        console.log(err)
    }
       
}

export {getCountries}