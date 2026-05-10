import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography } from '@mui/material'
import { flattenJSON, unflattenJSON } from '@/services/json/formatter'
import toast from 'react-hot-toast'

const FlattenJSON: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleFlatten = () => {
    try {
      const data = JSON.parse(input)
      const flattened = flattenJSON(data)
      setOutput(JSON.stringify(flattened, null, 2))
      toast.success('JSON flattened!')
    } catch {
      toast.error('Invalid JSON')
    }
  }

  const handleUnflatten = () => {
    try {
      const data = JSON.parse(input)
      const unflattened = unflattenJSON(data)
      setOutput(JSON.stringify(unflattened, null, 2))
      toast.success('JSON unflattened!')
    } catch {
      toast.error('Invalid JSON')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Flatten JSON
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Convert JSON to and from dot notation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Input JSON
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" fullWidth onClick={handleFlatten}>
                Flatten
              </Button>
              <Button variant="outlined" fullWidth onClick={handleUnflatten}>
                Unflatten
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Output
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

export default FlattenJSON
