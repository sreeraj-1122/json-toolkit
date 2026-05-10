import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Alert, Typography } from '@mui/material'
import { repairJSON } from '@/services/json/repair'
import toast from 'react-hot-toast'

const JSONRepair: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleRepair = () => {
    const repaired = repairJSON(input)
    setOutput(repaired)
    toast.success('JSON repaired!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JSON Repair
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Fix malformed JSON automatically - fixes trailing commas, unquoted keys, and more
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Malformed JSON
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste malformed JSON here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRepair}>
              Repair
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Repaired JSON
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

export default JSONRepair
