import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import * as Icons from '@mui/icons-material'
import { VALIDATE_TOOLS, VIEW_TOOLS, CONVERT_TOOLS } from '@/types/tools'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      CheckCircle: <Icons.CheckCircle sx={{ fontSize: 40 }} />,
      BuildCircle: <Icons.BuildCircle sx={{ fontSize: 40 }} />,
      ErrorOutline: <Icons.ErrorOutline sx={{ fontSize: 40 }} />,
      FormatAlignLeft: <Icons.FormatAlignLeft sx={{ fontSize: 40 }} />,
      Compress: <Icons.Compress sx={{ fontSize: 40 }} />,
      SortByAlpha: <Icons.SortByAlpha sx={{ fontSize: 40 }} />,
      SwapHoriz: <Icons.SwapHoriz sx={{ fontSize: 40 }} />,
      Code: <Icons.Code sx={{ fontSize: 40 }} />,
      AccountTree: <Icons.AccountTree sx={{ fontSize: 40 }} />,
      TableChart: <Icons.TableChart sx={{ fontSize: 40 }} />,
      CompareArrows: <Icons.CompareArrows sx={{ fontSize: 40 }} />,
      ManageSearch: <Icons.ManageSearch sx={{ fontSize: 40 }} />,
      Search: <Icons.Search sx={{ fontSize: 40 }} />,
      BarChart: <Icons.BarChart sx={{ fontSize: 40 }} />,
      FlattenOutlined: <Icons.FlattenOutlined sx={{ fontSize: 40 }} />,
      Transform: <Icons.Transform sx={{ fontSize: 40 }} />,
      DataUsage: <Icons.DataUsage sx={{ fontSize: 40 }} />,
      CastConnected: <Icons.CastConnected sx={{ fontSize: 40 }} />,
      LockOpen: <Icons.LockOpen sx={{ fontSize: 40 }} />,
      Architecture: <Icons.Architecture sx={{ fontSize: 40 }} />,
    }
    return iconMap[iconName] || <Icons.Code sx={{ fontSize: 40 }} />
  }

  const ToolCard: React.FC<{ tool: (typeof VALIDATE_TOOLS)[0] }> = ({ tool }) => (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
      onClick={() => navigate(tool.path)}
    >
      <CardContent>
        <Box sx={{ color: 'primary.main', mb: 1 }}>{getIcon(tool.icon)}</Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {tool.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {tool.description}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {tool.tags.slice(0, 2).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            JSON Toolkit
          </Typography>
          <Typography variant="h6" fontWeight={400} sx={{ mb: 3, opacity: 0.95 }}>
            18+ Free JSON Tools for Developers
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Validate, format, convert, compare, and analyze JSON with ease. Professional-grade
            tools for modern development.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="inherit"
              size="large"
              onClick={() => navigate('/tools/validator')}
              endIcon={<ArrowForwardIcon />}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/tools/validator')}
            >
              Explore Tools
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          18+ Free JSON Tools
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Professional JSON toolkit with all the features developers need
        </Typography>

        {/* Validate & Format */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, mt: 6 }}>
          Validate & Format
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {VALIDATE_TOOLS.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>

        {/* View & Query */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, mt: 6 }}>
          View & Query
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {VIEW_TOOLS.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>

        {/* Convert & Transform */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, mt: 6 }}>
          Convert & Transform
        </Typography>
        <Grid container spacing={3}>
          {CONVERT_TOOLS.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ready to boost your productivity?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.95 }}>
            Start using our JSON tools for free. No registration, no limits.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => navigate('/tools/validator')}
            endIcon={<ArrowForwardIcon />}
          >
            Start Now
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage
