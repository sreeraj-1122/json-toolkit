import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Tabs, Tab } from '@mui/material'
import { escapeJSON, unescapeJSON } from '@/services/json/formatter'
import toast from 'react-hot-toast'

const EscapeUnescape: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape')

  const handleEscape = () => {
    const escaped = escapeJSON(input)
    setOutput(escaped)
    toast.success('JSON escaped!')
  }

  const handleUnescape = () => {
    const unescaped = unescapeJSON(input)
    setOutput(unescaped)
    toast.success('JSON unescaped!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Escape / Unescape
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Convert between JSON strings and escaped text
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={mode} onChange={(_, value) => setMode(value)}>
          <Tab label="Escape" value="escape" />
          <Tab label="Unescape" value="unescape" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Input
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={mode === 'escape' ? handleEscape : handleUnescape}
            >
              {mode === 'escape' ? 'Escape' : 'Unescape'}
            </Button>
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

export default EscapeUnescape
