import React, { useState } from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import HomeIcon from '@mui/icons-material/Home'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as Icons from '@mui/icons-material'
import { useThemeStore } from '@/store/themeStore'
import { VALIDATE_TOOLS, VIEW_TOOLS, CONVERT_TOOLS } from '@/types/tools'

const DRAWER_WIDTH = 280

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    validate: true,
    view: true,
    convert: true,
  })

  const { theme: themeMode, toggleTheme } = useThemeStore()

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      CheckCircle: <Icons.CheckCircle />,
      BuildCircle: <Icons.BuildCircle />,
      ErrorOutline: <Icons.ErrorOutline />,
      FormatAlignLeft: <Icons.FormatAlignLeft />,
      Compress: <Icons.Compress />,
      SortByAlpha: <Icons.SortByAlpha />,
      SwapHoriz: <Icons.SwapHoriz />,
      Code: <Icons.Code />,
      AccountTree: <Icons.AccountTree />,
      TableChart: <Icons.TableChart />,
      CompareArrows: <Icons.CompareArrows />,
      ManageSearch: <Icons.ManageSearch />,
      Search: <Icons.Search />,
      BarChart: <Icons.BarChart />,
      FlattenOutlined: <Icons.FlattenOutlined />,
      Transform: <Icons.Transform />,
      DataUsage: <Icons.DataUsage />,
      CastConnected: <Icons.CastConnected />,
      LockOpen: <Icons.LockOpen />,
      Architecture: <Icons.Architecture />,
    }
    return iconMap[iconName] || <Icons.Code />
  }

  const ToolSection: React.FC<{
    title: string
    section: string
    tools: typeof VALIDATE_TOOLS
  }> = ({ title, section, tools }) => (
    <>
      <ListItemButton
        onClick={() => toggleSection(section)}
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: 'action.hover',
          '&:hover': {
            backgroundColor: 'action.selected',
          },
        }}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'subtitle1',
            fontWeight: 600,
          }}
        />
        {expandedSections[section] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={expandedSections[section]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tools.map((tool) => (
            <ListItemButton
              key={tool.id}
              onClick={() => {
                navigate(tool.path)
                setMobileOpen(false)
              }}
              selected={location.pathname === tool.path}
              sx={{
                pl: 4,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {getIcon(tool.icon)}
              </ListItemIcon>
              <ListItemText
                primary={tool.name}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )

  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={700}>
          🔨 JSON Toolkit
        </Typography>
      </Box>
      <Divider />
      <List
        component="nav"
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
          },
        }}
      >
        <ListItemButton
          onClick={() => {
            navigate('/')
            setMobileOpen(false)
          }}
          selected={location.pathname === '/'}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ToolSection title="Validate & Format" section="validate" tools={VALIDATE_TOOLS} />
        <Divider sx={{ my: 1 }} />
        <ToolSection title="View & Query" section="view" tools={VIEW_TOOLS} />
        <Divider sx={{ my: 1 }} />
        <ToolSection title="Convert & Transform" section="convert" tools={CONVERT_TOOLS} />
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 700 }}>
            JSON Toolkit
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer variant="permanent" open>
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
          mt: 8,
          p: { xs: 1, sm: 2, md: 3 },
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
