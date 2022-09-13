import React,{useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid} from '@mui/x-data-grid';
import {getAirlines, setAirline,deleteAirline,updateAirline} from '../controller/airlinesApi'
import {getCountries} from '../controller/countriesApi'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';




function Airlines() {
  const [airlines, setAirlines] = useState([]);
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [isData, setIsData] = useState(false);
  const [option, setOption] = useState("")
  const [rowId, setRowId] = useState("")

  //data of form
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')

  //Handling modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName('')
    setCountry('')
    setOpen(false);
  }


  //CRUD OPERATIONS

  //Creating new airline and updating depending of option
  const addUpdateAirline = () => {
   
    
    //Validation of fields
    if(name === ''){
      alert("Please choose some valid name")
    }
    else if(country === ''){
      alert("Please choose some valid country")
    }
    else{
      
      //Getting list of available countries
      //Matching the possible country from list

      let matchCountry = countries.filter((el) =>{
        return el.name.toUpperCase() === country.toUpperCase()
      })

      if(option === 'add'){
        setAirline(name, matchCountry[0]._id)
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
      else if(option === 'update'){
        console.log("update")
        updateAirline(rowId, name, matchCountry[0]._id )
        .then(() => {
          getAirlines(setAirlines)
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
    setRowId(params.id)
    console.log(params)
    handleOpen()
    setOption('update')
  }
  //Deleting airline
  const onClickDelete = (params) => {
    console.log(params)
    deleteAirline(params.row._id)
    setIsData(!isData)
    console.log("Brišem!!")
  }

  useEffect(() => {
    getCountries(setCountries)
  }, [])
  //Initialize on first render
  useEffect(() => {
    getAirlines(setAirlines)
  },[isData])
  const columns = [
    { field: '_id', headerName: 'ID', flex: 1},
    { field: 'name', headerName: 'Name of Airline', flex: 1},
    { field: 'country', headerName: 'Country', flex: 1, valueGetter : (params) => params.row.country.name },
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
    boxShadow: 24,
    p: 4,
  };

  if (!airlines.length || !countries.length) return <div className='spinner'><CircularProgress size="5rem" /></div>
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
        rows={airlines}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnSelector={true}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue={name}
          onChange={(params) => {
            setName(params.target.value)
          }}
          />
          <br />
          <TextField
          required
          id="outlined-required"
          label="Country"
          defaultValue={country}
          onChange={(params) => {
            setCountry(params.target.value)
          }}
          />
          <br />
          <Button 
            variant="contained" 
            onClick={addUpdateAirline}>Sumbit</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default Airlines