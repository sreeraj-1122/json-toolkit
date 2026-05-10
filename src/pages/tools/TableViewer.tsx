import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import toast from 'react-hot-toast'

const TableViewer: React.FC = () => {
  const [input, setInput] = useState('')
  const [tableData, setTableData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])

  const handleView = () => {
    try {
      const data = JSON.parse(input)
      if (Array.isArray(data) && data.length > 0) {
        setTableData(data)
        const cols = Object.keys(data[0])
        setColumns(cols)
        toast.success('Table loaded!')
      } else {
        toast.error('JSON must be an array of objects')
      }
    } catch {
      toast.error('Invalid JSON')
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Table Viewer
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        View JSON arrays as interactive tables
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Input JSON Array
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON array here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleView}>
              View as Table
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Table View
            </Typography>
            {tableData.length > 0 && (
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell key={col} fontWeight={600}>
                          {col}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((col) => (
                          <TableCell key={`${rowIndex}-${col}`}>
                            {JSON.stringify(row[col])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableViewer
