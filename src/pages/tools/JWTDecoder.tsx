import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Alert, Card, CardContent } from '@mui/material'
import { decodeJWT } from '@/services/json/conversion'
import toast from 'react-hot-toast'

const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<any>(null)

  const handleDecode = () => {
    const result = decodeJWT(token)
    if (result.valid) {
      setDecoded(result)
      toast.success('JWT decoded successfully!')
    } else {
      setDecoded(null)
      toast.error('Invalid JWT token')
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JWT Decoder
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Decode and inspect JWT tokens
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              JWT Token
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste JWT token here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleDecode}>
              Decode JWT
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {decoded && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Header
              </Typography>
              <Card sx={{ backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
                  >
                    {JSON.stringify(decoded.header, null, 2)}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Payload
              </Typography>
              <Card sx={{ backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
                  >
                    {JSON.stringify(decoded.payload, null, 2)}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default JWTDecoder
