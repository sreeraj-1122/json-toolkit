import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent, Chip, Stack } from '@mui/material'
import toast from 'react-hot-toast'

const JSONDiff: React.FC = () => {
  const [json1, setJson1] = useState('')
  const [json2, setJson2] = useState('')
  const [diff, setDiff] = useState<any>(null)

  const handleCompare = () => {
    try {
      const obj1 = JSON.parse(json1)
      const obj2 = JSON.parse(json2)

      const differences = findDifferences(obj1, obj2)
      setDiff(differences)
      toast.success(`Found ${differences.length} differences`)
    } catch {
      toast.error('Invalid JSON')
    }
  }

  const findDifferences = (obj1: any, obj2: any, path = ''): any[] => {
    const diffs: any[] = []

    const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])

    for (const key of keys) {
      const newPath = path ? `${path}.${key}` : key
      const val1 = (obj1 || {})[key]
      const val2 = (obj2 || {})[key]

      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        diffs.push({
          path: newPath,
          value1: val1,
          value2: val2,
          type: !(key in (obj1 || {})) ? 'added' : !(key in (obj2 || {})) ? 'removed' : 'modified',
        })
      }
    }

    return diffs
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        JSON Diff
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Compare two JSON documents and view differences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              First JSON
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder="Paste first JSON..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Second JSON
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder="Paste second JSON..."
              variant="outlined"
              sx={{
                fontFamily: 'monospace',
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'monospace',
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleCompare}>
        Compare
      </Button>

      {diff && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Differences ({diff.length})
          </Typography>
          {diff.map((d: any, index: number) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {d.path}
                  </Typography>
                  <Chip
                    label={d.type}
                    size="small"
                    color={d.type === 'added' ? 'success' : d.type === 'removed' ? 'error' : 'warning'}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Before
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
                    >
                      {JSON.stringify(d.value1, null, 2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      After
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
                    >
                      {JSON.stringify(d.value2, null, 2)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default JSONDiff
