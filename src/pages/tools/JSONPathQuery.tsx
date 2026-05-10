import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material'
import { queryJSON } from '@/services/json/query'
import toast from 'react-hot-toast'

const JSONPathQuery: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleQuery = () => {
    try {
      const data = JSON.parse(jsonInput)
      const queryResults = queryJSON(data, query)
      setResults(queryResults)
      toast.success(`Found ${queryResults.length} matches`)
    } catch (error) {
      toast.error('Invalid JSON or query')
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JSONPath Query
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Execute JSONPath expressions to query JSON data
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
              label="JSONPath Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., $.items[*].name"
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleQuery}>
              Execute Query
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
                    Match {index + 1}
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

export default JSONPathQuery
