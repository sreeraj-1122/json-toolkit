import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Alert, Typography } from '@mui/material'
import { analyzeError } from '@/services/json/repair'
import toast from 'react-hot-toast'

const ErrorAnalyzer: React.FC = () => {
  const [input, setInput] = useState('')
  const [explanation, setExplanation] = useState('')

  const handleAnalyze = () => {
    const analysis = analyzeError(input)
    setExplanation(analysis)
    toast.success('Error analyzed!')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Error Analyzer
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Get human-readable explanations for JSON errors
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
              placeholder="Paste JSON with errors..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAnalyze}>
              Analyze Error
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Analysis Result
            </Typography>
            {explanation && <Alert severity="info">{explanation}</Alert>}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ErrorAnalyzer
