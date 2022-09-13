import axios from 'axios'

/* const API_URL = '/api/' */

const getAirlines = async (setAirlines) => {
    try{
        const response = await axios.get('/api/airlines')
        setAirlines(response.data)  
        console.log("Dobivam podatke o svim airlineovima!")
    }catch(err){
        console.log(err)
    }
       
}

const setAirline = async (name,country) => {
    try{
        const response = await axios.post('/api/airlines', {
            name : name,
            country : country,
        })
        return response
    }catch(err){
        console.log(err)
    }
       
}

const deleteAirline = async (id) => {
    const url = '/api/airlines/' + id;
    
    try{
        console.log("Deletam airline")
        const response = await axios.delete(url)
        return response
          
    }catch(err){
        console.log(err)
    }
       
}

const updateAirline = async (id, name, country) => {
    const url = '/api/airlines/' + id;

    try{
        const response = await axios.put(url, {
            name: name,
            country:country
        })
        return response
          
    }catch(err){
        console.log(err)
    }
       
}

export {getAirlines,setAirline,deleteAirline,updateAirline}