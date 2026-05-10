import React, { useState } from 'react'
import { Box, Paper, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material'
import toast from 'react-hot-toast'

const TreeViewer: React.FC = () => {
  const [input, setInput] = useState('')
  const [treeData, setTreeData] = useState<any>(null)

  const handleView = () => {
    try {
      const data = JSON.parse(input)
      setTreeData(data)
      toast.success('Tree loaded!')
    } catch {
      toast.error('Invalid JSON')
    }
  }

  const TreeNode: React.FC<{ data: any; name: string }> = ({ data, name }) => {
    const [expanded, setExpanded] = useState(true)
    const isObject = data !== null && typeof data === 'object'
    const isArray = Array.isArray(data)

    if (!isObject) {
      return (
        <Typography variant="body2" sx={{ ml: 2, my: 0.5, fontFamily: 'monospace' }}>
          <strong>{name}:</strong> {JSON.stringify(data)}
        </Typography>
      )
    }

    return (
      <Box sx={{ ml: 2 }}>
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
        >
          {expanded ? '▼' : '▶'} {name}
          {isArray ? ` [${data.length}]` : ` {}`}
        </Button>
        {expanded && (
          <Box sx={{ ml: 2 }}>
            {isArray
              ? data.map((item, index) => <TreeNode key={index} name={`[${index}]`} data={item} />)
              : Object.keys(data).map((key) => (
                  <TreeNode key={key} name={key} data={data[key]} />
                ))}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Tree Viewer
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Explore JSON as an interactive tree structure
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
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleView}>
              View Tree
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, maxHeight: 600, overflowY: 'auto' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Tree View
            </Typography>
            {treeData && <TreeNode name="root" data={treeData} />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TreeViewer
