import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Stack, FormControlLabel, Checkbox } from '@mui/material'
import { formatJSON } from '@/services/json/formatter'
import toast from 'react-hot-toast'

const PrettyPrint: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState(2)
  const [useTabs, setUseTabs] = useState(false)

  const handleFormat = () => {
    const formatted = formatJSON(input, { indent, tabs: useTabs })
    setOutput(formatted)
    toast.success('JSON formatted!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Pretty Print
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Format JSON with custom indentation
      </Typography>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            type="number"
            label="Indent Size"
            value={indent}
            onChange={(e) => setIndent(parseInt(e.target.value))}
            inputProps={{ min: 1, max: 8 }}
            sx={{ width: 150 }}
          />
          <FormControlLabel
            control={<Checkbox checked={useTabs} onChange={(e) => setUseTabs(e.target.checked)} />}
            label="Use Tabs"
          />
        </Stack>
      </Stack>

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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleFormat}>
              Format
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Formatted JSON
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

export default PrettyPrint
