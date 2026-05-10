import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material'
import { generateJSONSchema } from '@/services/json/schema'
import toast from 'react-hot-toast'

const SchemaGenerator: React.FC = () => {
  const [input, setInput] = useState('')
  const [schema, setSchema] = useState<any>(null)

  const handleGenerate = () => {
    try {
      const data = JSON.parse(input)
      const generatedSchema = generateJSONSchema(data)
      setSchema(generatedSchema)
      toast.success('Schema generated!')
    } catch {
      toast.error('Invalid JSON')
    }
  }

  const handleCopy = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
      toast.success('Copied to clipboard')
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Schema Generator
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Generate JSON Schema from JSON data
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleGenerate}>
              Generate Schema
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Generated Schema
            </Typography>
            {schema && (
              <>
                <Card sx={{ backgroundColor: '#f5f5f5', mb: 2 }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', overflow: 'auto', maxHeight: 400 }}
                    >
                      {JSON.stringify(schema, null, 2)}
                    </Typography>
                  </CardContent>
                </Card>
                <Button variant="contained" fullWidth onClick={handleCopy}>
                  Copy Schema
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SchemaGenerator
