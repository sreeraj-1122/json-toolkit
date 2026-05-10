import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Alert, Card, CardContent, Typography, Stack } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { validateJSON } from '@/services/json/validator'
import toast from 'react-hot-toast'

const JSONValidator: React.FC = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleValidate = () => {
    const validationResult = validateJSON(input)
    setResult(validationResult)
    if (validationResult.valid) {
      toast.success('Valid JSON!')
    } else {
      toast.error('Invalid JSON')
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JSON Validator
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Real-time JSON validation with detailed error messages
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
              spellCheck="false"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleValidate}>
              Validate
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Validation Result
            </Typography>
            {result && (
              <Box>
                {result.valid ? (
                  <Alert severity="success">✓ Valid JSON</Alert>
                ) : (
                  <>
                    <Alert severity="error">✗ Invalid JSON</Alert>
                    {result.errors.map((error: any, index: number) => (
                      <Card key={index} sx={{ mt: 2, backgroundColor: '#fff3cd' }}>
                        <CardContent>
                          <Typography variant="body2" fontWeight={600}>
                            Error at Line {error.line}, Column {error.column}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {error.message}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
                <Stack sx={{ mt: 2 }} spacing={1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleCopy(JSON.stringify(result, null, 2))}
                    startIcon={<ContentCopyIcon />}
                  >
                    Copy Result
                  </Button>
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default JSONValidator
