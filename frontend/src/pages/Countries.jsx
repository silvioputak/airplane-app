import React,{useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import {getCountries} from '../controller/countriesApi'
function Countries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
     getCountries(setCountries)
  },[])

  const columns = [
   /*  { field: '_id', headerName: 'ID', flex: 1}, */
    { field: 'name', headerName: 'Name of Country', flex: 1 },
    { field: 'code', headerName: 'Code name', flex: 1 },
  ]

  if (!countries.length) return <div className='spinner'><CircularProgress size="5rem" /></div>
  return (
    <div style={{ height: '1000px', width: '100%' }}>
      <DataGrid
        colmnHeight={'100%'}
        rows={countries}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </div>
  )
}

export default Countries