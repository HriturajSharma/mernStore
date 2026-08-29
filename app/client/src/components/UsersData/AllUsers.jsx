import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { HttpGet } from '../common/utlis/helper'
function AllUsers () {
  let [columns, setColums] = useState([])
  const [rows, setRows] = useState([])

  let handleGetData = async () => {
    let res = await HttpGet('/getAllUser')
    let data = res?.response?.data
    console.log('check  == res', res?.response?.data)
    let dataColumn = Object.keys(data[0]).map(key => ({
      field: key,
      headerName: key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase()),
      flex: 1,
      minWidth: 150
    }))

    setColums(dataColumn)
    setRows(data)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <div>
      get all user's
      <div style={{ flex: 1, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={row => row._id}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#02305f !important',
              color: '#fff'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              //   fontWeight: 'bold',
              color: '#fff'
            }
          }}
          columnVisibilityModel={{
            password: false,
            resetPasswordToken: false,
            resetPasswordExpire: false
          }}
        />
      </div>
    </div>
  )
}

export default AllUsers
