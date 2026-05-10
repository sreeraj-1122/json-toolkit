import React from 'react'
import { Outlet } from 'react-router-dom'
import MainLayout from './MainLayout'

const ToolsLayout: React.FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default ToolsLayout
