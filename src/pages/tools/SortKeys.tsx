import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material'
import { sortJSONKeys } from '@/services/json/formatter'
import toast from 'react-hot-toast'

const SortKeys: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleSort = () => {
    const sorted = sortJSONKeys(input, true)
    setOutput(sorted)
    toast.success('Keys sorted!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Sort Keys
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Recursively sort all object keys in alphabetical order
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSort}>
              Sort Keys
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Sorted JSON
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

export default SortKeys
