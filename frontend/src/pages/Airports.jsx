import React,{useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid} from '@mui/x-data-grid';
import {getAirports} from '../controller/airportsApi'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Airports() {
  const [airports, setAirports] = useState([]);
  const [open, setOpen] = useState(false);

  const deleteRow = (e) => {
    //e.target.id
    console.log(e.target.value)
  }

  const addRow = () => {
    setOpen(true)
  }

  //Handling modals
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const countryName = (params) => {
    return params.row.country.name
  }

  const airlinesName = (params) => {
    const listOfAirlines = params.row.airline
    const airlines = listOfAirlines.map((airline) => {
      return airline.name;
    }).join(",")
    return airlines
  }

  useEffect(() => {
     getAirports(setAirports)
  },[])

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1,},
    { field: 'name', headerName: 'Name of Country', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1, valueGetter : countryName },
    { field: 'location', headerName: 'location', flex: 1 },
    { field: 'airline', headerName: 'Airlines', flex: 1, valueGetter: airlinesName },
    { field: 'delete',
      headerName: 'Delete',
      flex: 0.3,
      sortable : false,
      renderCell: (params) => {
        return <Button value={params.id} variant="contained" onClick={deleteRow}>Delete</Button>
      },
    },

    { 
      field: 'update',
      headerName: 'Update',
      flex: 0.3,
      sortable : false,
      renderCell: (params) => {
        return <Button id="update" variant="contained" /* onClick={onClick} */>Update</Button>
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
  // When api gets fetched spinner will
  if (!airports.length) return <div className='spinner'><CircularProgress size="5rem" /></div>
  return (
    <div style={{ height: '800px', width: '80%', margin: '3rem auto' }}>
       <Button onClick={handleOpen} variant="contained"><AddIcon></AddIcon>Add</Button>
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
        {/* <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Croatia Airlines"
        /> */}

        </Box>
      </Modal>
    </div>
  )
}

export default Airports