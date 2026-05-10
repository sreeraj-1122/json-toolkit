import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent, FormControlLabel, Checkbox } from '@mui/material'
import { searchJSON } from '@/services/json/query'
import toast from 'react-hot-toast'

const JSONSearch: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [searchKeys, setSearchKeys] = useState(true)

  const handleSearch = () => {
    try {
      const data = JSON.parse(jsonInput)
      const searchResults = searchJSON(data, searchTerm, searchKeys)
      setResults(searchResults)
      toast.success(`Found ${searchResults.length} matches`)
    } catch (error) {
      toast.error('Invalid JSON')
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JSON Search
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Search JSON keys and values
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
              rows={10}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON here..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <TextField
              fullWidth
              label="Search Term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <FormControlLabel
              control={<Checkbox checked={searchKeys} onChange={(e) => setSearchKeys(e.target.checked)} />}
              label="Search in Keys"
              sx={{ mt: 1 }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSearch}>
              Search
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Results
            </Typography>
            {results.map((result, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body2" fontWeight={600}>
                    {result.key || result.path}
                  </Typography>
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', mt: 1 }}>
                    {JSON.stringify(result.value, null, 2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default JSONSearch
