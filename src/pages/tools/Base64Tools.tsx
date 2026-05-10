import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Tabs, Tab, Alert } from '@mui/material'
import { encodeBase64, decodeBase64 } from '@/services/json/conversion'
import toast from 'react-hot-toast'

const Base64Tools: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleEncode = () => {
    const encoded = encodeBase64(input)
    setOutput(encoded)
    toast.success('Encoded to Base64!')
  }

  const handleDecode = () => {
    const decoded = decodeBase64(input)
    setOutput(decoded)
    toast.success('Decoded from Base64!')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Base64 Tools
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Encode and decode Base64 strings
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={mode} onChange={(_, value) => setMode(value)}>
          <Tab label="Encode" value="encode" />
          <Tab label="Decode" value="decode" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Input {mode === 'encode' ? 'Text' : 'Base64'}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste ${mode === 'encode' ? 'text' : 'Base64'} here...`}
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
              onClick={mode === 'encode' ? handleEncode : handleDecode}
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Output {mode === 'encode' ? 'Base64' : 'Text'}
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

export default Base64Tools
