import React,{useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid} from '@mui/x-data-grid';
import {getAirports, setAirport, updateAirport,deleteAirport} from '../controller/airportsApi'
import { getAirlines } from '../controller/airlinesApi';
import { getCountries } from '../controller/countriesApi';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import GoogleMaps from '../components/GoogleMaps'
import Dropdown from '../components/Dropdown';
import { GoogleMap, LoadScript} from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY



function Airports() {
  const [airports, setAirports] = useState([]);
  const [countries, setCountries] = useState([]);
  const [airlines, setAirlines] = useState([]);


  const [open, setOpen] = useState(false);
  // state for triggering useEffect on every change
  const [isData, setIsData] = useState(false);
  // state for chosing between update or adding airline
  const [option, setOption] = useState("")
  // state for saving id of selected row
  const [rowId, setRowId] = useState("")

  //data of form
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [location, setLocation] = useState([])
  const [airline, setAirline] = useState([])
  const [selectedAirline, setSelectedAirline] = useState("")
  

 


  //Handling modals
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateLocation = (country_name,location_name) => {
    setCountry(country_name)
    setLocation(location_name)
    let matchCountry = countries.filter((el) =>{
      return el.name.toUpperCase() === country_name.toUpperCase()
    })
    console.log("matchCountry", matchCountry)
    if(matchCountry.length){
      console.log("Matching")
      console.log(airlines)
      let matchAirlines = airlines.filter((el) => {
        return matchCountry[0]._id === el.country._id
      })
      console.log(console.log("matchAirlines", matchCountry))
      if(matchAirlines.length){
        setAirline(matchAirlines)
      }
    }
  }

  const onClickAirline = (value) => {
    setSelectedAirline(value)
  }


  const addUpdateAirline = () => {
    //Validation of fields
    if(name === '' || country === '' || location === '' ||  airline === ''){
      alert("Please fill all fields")
    }
    else if(!airlines.length){
      alert("You need to create first airline")
    }
    else{
      //Getting list of available countries
      //Matching the possible country from list
      let matchCountry = countries.filter((el) =>{
        return el.name.toUpperCase() === country.toUpperCase()
      })
      console.log(country)
      console.log(matchCountry)

      
      if(!matchCountry.length){
        alert("Please choose country from the list!")
      }

      else if(option === 'add'){

        let matchAirlines = airlines.filter((el) => {
          return matchCountry[0]._id === el.country._id
        })
        if(!matchAirlines.length){
          setLocation(matchAirlines[0])
        }

        setAirport(name, matchCountry[0]._id, location, selectedAirline)
        .then(() => {
          setIsData(!isData)
          setOpen(false);
          setName('')
          setCountry('')
        })
        .catch(err => {
          console.log(err)
        })
      }

    }
  }

  const onClickUpdate = (params) => {
    setName(params.row.name);
    setCountry(params.row.country.name);
    setLocation(params.row.country.location);
    setAirline(params.row.country.airline);
    setRowId(params.id)
    handleOpen()
    setOption('update')
  }
  //Handling on click delete
  const onClickDelete = (params) => {
    deleteAirport(params.row._id)
    .then(() => {
      getAirports(setAirports)
    })
    .catch(err => {
      console.log(err)
    })
    /* deleteAirline(params.row._id)
    setIsData(!isData) */
  }




  useEffect(() => {
     getAirports(setAirports)
     getAirlines(setAirlines)
     getCountries(setCountries)
  },[])

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1,},
    { field: 'name', headerName: 'Name of Country', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1, valueGetter : (params) => params.row.country.name },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'airline', headerName: 'Airline', flex: 1, valueGetter: (params) => params.row.country.name ? params.row.country.name : '' },
    { 
      field: 'update',
      headerName: 'Update',
      flex: 0.3,
      sortable : false,
      renderCell: (params) => {
        return <Button  
          variant="contained"
          onClick={() => {
            setOption('update')
            onClickUpdate(params)
          }}
          >Update</Button>
      }
    },
    { field: 'delete',
      headerName: 'Delete',
      flex: 0.3,
      sortable : false,
      renderCell: (params) => {
        return <Button  variant="contained"
         onClick={() => {onClickDelete(params)}}>Delete</Button>
      }
    },
  ]


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    /* boxShadow: 24, */
    p: 4,
  };
  // When api gets fetched spinner will
  if (!airports.length) return <div className='spinner'><CircularProgress size="5rem" /></div>
  return (
    <div style={{ height: '800px', width: '80%', margin: '3rem auto' }}>
       <Stack direction="row" spacing={2}>
        <Button 
          onClick={() => {
            handleOpen()
            setOption('add')
          }} 
          variant="contained">
        <AddIcon></AddIcon>Add</Button>
      </Stack>
      <DataGrid
        rows={airports}
        columns={columns}
        getRowId={(row) => row._id}
      />
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction={"column"} spacing={5}>
            <Grid item>
              <TextField
                required
                id="outlined-required"
                label="Name"
                defaultValue={name}
                
                helperText={name === "" ? 'Empty field Name' : ' '}
                onChange={(params) => {
                  setName(params.target.value)
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled
                required
                id="outlined-required"
                label="Country"
                value={country}
                helperText={country === "" ? 'Empty field Country' : ' '}
                onChange={(params) => {
                  setCountry(params.target.value)
                }}
              />
              
              {window.google === undefined ? 
              <LoadScript  googleMapsApiKey = {apiKey}><GoogleMaps updateLocation={updateLocation}/></LoadScript> :
               <GoogleMaps updateLocation={updateLocation}/>}
            </Grid>
            <Grid item>
              <TextField
                required
                id="outlined-required"
                label="Location"
                value={location}
                helperText={location === "" ? 'Empty field Location' : ' '}
                onChange={(params) => {
                  setLocation(params.target.value)
                }}
              />
              
            </Grid>
            
            <Grid item>
              {country ? <Dropdown airlines={airline} onClickAirline={onClickAirline}/> : null}
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                onClick={addUpdateAirline}>
                Sumbit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default Airports