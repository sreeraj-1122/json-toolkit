import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Tabs, Tab } from '@mui/material'
import { jsonToCSV, csvToJSON } from '@/services/json/conversion'
import toast from 'react-hot-toast'

const CSVConverter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv')

  const handleConvert = () => {
    if (mode === 'json-to-csv') {
      const csv = jsonToCSV(input)
      setOutput(csv)
      toast.success('Converted to CSV!')
    } else {
      const json = csvToJSON(input)
      setOutput(json)
      toast.success('Converted to JSON!')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        CSV Converter
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Convert between JSON and CSV formats
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={mode} onChange={(_, value) => setMode(value)}>
          <Tab label="JSON to CSV" value="json-to-csv" />
          <Tab label="CSV to JSON" value="csv-to-json" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Input {mode === 'json-to-csv' ? 'JSON' : 'CSV'}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste ${mode === 'json-to-csv' ? 'JSON array' : 'CSV'} here...`}
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleConvert}>
              Convert
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Output {mode === 'json-to-csv' ? 'CSV' : 'JSON'}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={output}
              readOnly
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCopy}>
              Copy Result
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CSVConverter
