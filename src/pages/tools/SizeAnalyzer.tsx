import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { analyzeJSON } from '@/services/json/analyzer'
import toast from 'react-hot-toast'

const SizeAnalyzer: React.FC = () => {
  const [input, setInput] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = () => {
    const result = analyzeJSON(input)
    setAnalysis(result)
    toast.success('Analysis complete!')
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Size Analyzer
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Analyze JSON structure, size, and statistics
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAnalyze}>
              Analyze
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Analysis Results
            </Typography>
            {analysis && (
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell fontWeight={600}>File Size</TableCell>
                      <TableCell>{analysis.fileSize} bytes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell fontWeight={600}>Depth</TableCell>
                      <TableCell>{analysis.depth}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell fontWeight={600}>Keys</TableCell>
                      <TableCell>{analysis.keyCount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell fontWeight={600}>Values</TableCell>
                      <TableCell>{analysis.valueCount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell fontWeight={600}>Arrays</TableCell>
                      <TableCell>{analysis.arrayCount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell fontWeight={600}>Objects</TableCell>
                      <TableCell>{analysis.objectCount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SizeAnalyzer
