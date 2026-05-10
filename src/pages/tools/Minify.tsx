import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Alert } from '@mui/material'
import { minifyJSON } from '@/services/json/formatter'
import toast from 'react-hot-toast'

const Minify: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState<any>(null)

  const handleMinify = () => {
    const minified = minifyJSON(input)
    setOutput(minified)

    const originalSize = new Blob([input]).size
    const minifiedSize = new Blob([minified]).size
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)

    setStats({
      originalSize,
      minifiedSize,
      reduction,
    })
    toast.success('JSON minified!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Minify JSON
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Remove whitespace and compress JSON to reduce file size
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleMinify}>
              Minify
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Minified JSON
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
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

            {stats && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                  Original: {stats.originalSize} bytes | Minified: {stats.minifiedSize} bytes | Reduced:
                  {stats.reduction}%
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Minify
