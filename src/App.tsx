import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useThemeStore } from './store/themeStore'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme, darkTheme } from './theme'
import MainLayout from './components/layout/MainLayout'
import LandingPage from './pages/LandingPage'
import Loading from './components/common/Loading'
import ErrorBoundary from './components/common/ErrorBoundary'

// Lazy load tool pages
const JSONValidator = React.lazy(() => import('./pages/tools/JSONValidator'))
const JSONRepair = React.lazy(() => import('./pages/tools/JSONRepair'))
const ErrorAnalyzer = React.lazy(() => import('./pages/tools/ErrorAnalyzer'))
const PrettyPrint = React.lazy(() => import('./pages/tools/PrettyPrint'))
const Minify = React.lazy(() => import('./pages/tools/Minify'))
const SortKeys = React.lazy(() => import('./pages/tools/SortKeys'))
const EscapeUnescape = React.lazy(() => import('./pages/tools/EscapeUnescape'))
const Stringify = React.lazy(() => import('./pages/tools/Stringify'))
const TreeViewer = React.lazy(() => import('./pages/tools/TreeViewer'))
const TableViewer = React.lazy(() => import('./pages/tools/TableViewer'))
const JSONDiff = React.lazy(() => import('./pages/tools/JSONDiff'))
const JSONPathQuery = React.lazy(() => import('./pages/tools/JSONPathQuery'))
const JSONSearch = React.lazy(() => import('./pages/tools/JSONSearch'))
const SizeAnalyzer = React.lazy(() => import('./pages/tools/SizeAnalyzer'))
const FlattenJSON = React.lazy(() => import('./pages/tools/FlattenJSON'))
const YAMLConverter = React.lazy(() => import('./pages/tools/YAMLConverter'))
const CSVConverter = React.lazy(() => import('./pages/tools/CSVConverter'))
const Base64Tools = React.lazy(() => import('./pages/tools/Base64Tools'))
const JWTDecoder = React.lazy(() => import('./pages/tools/JWTDecoder'))
const SchemaGenerator = React.lazy(() => import('./pages/tools/SchemaGenerator'))

function App() {
  const themeMode = useThemeStore((state) => state.theme)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<MainLayout />}>
              {/* Validate & Format Tools */}
              <Route
                path="/tools/validator"
                element={
                  <Suspense fallback={<Loading />}>
                    <JSONValidator />
                  </Suspense>
                }
              />
              <Route
                path="/tools/repair"
                element={
                  <Suspense fallback={<Loading />}>
                    <JSONRepair />
                  </Suspense>
                }
              />
              <Route
                path="/tools/error-analyzer"
                element={
                  <Suspense fallback={<Loading />}>
                    <ErrorAnalyzer />
                  </Suspense>
                }
              />
              <Route
                path="/tools/pretty-print"
                element={
                  <Suspense fallback={<Loading />}>
                    <PrettyPrint />
                  </Suspense>
                }
              />
              <Route
                path="/tools/minify"
                element={
                  <Suspense fallback={<Loading />}>
                    <Minify />
                  </Suspense>
                }
              />
              <Route
                path="/tools/sort-keys"
                element={
                  <Suspense fallback={<Loading />}>
                    <SortKeys />
                  </Suspense>
                }
              />
              <Route
                path="/tools/escape-unescape"
                element={
                  <Suspense fallback={<Loading />}>
                    <EscapeUnescape />
                  </Suspense>
                }
              />
              <Route
                path="/tools/stringify"
                element={
                  <Suspense fallback={<Loading />}>
                    <Stringify />
                  </Suspense>
                }
              />
              {/* View & Query Tools */}
              <Route
                path="/tools/tree-viewer"
                element={
                  <Suspense fallback={<Loading />}>
                    <TreeViewer />
                  </Suspense>
                }
              />
              <Route
                path="/tools/table-viewer"
                element={
                  <Suspense fallback={<Loading />}>
                    <TableViewer />
                  </Suspense>
                }
              />
              <Route
                path="/tools/json-diff"
                element={
                  <Suspense fallback={<Loading />}>
                    <JSONDiff />
                  </Suspense>
                }
              />
              <Route
                path="/tools/jsonpath-query"
                element={
                  <Suspense fallback={<Loading />}>
                    <JSONPathQuery />
                  </Suspense>
                }
              />
              <Route
                path="/tools/json-search"
                element={
                  <Suspense fallback={<Loading />}>
                    <JSONSearch />
                  </Suspense>
                }
              />
              <Route
                path="/tools/size-analyzer"
                element={
                  <Suspense fallback={<Loading />}>
                    <SizeAnalyzer />
                  </Suspense>
                }
              />
              <Route
                path="/tools/flatten-json"
                element={
                  <Suspense fallback={<Loading />}>
                    <FlattenJSON />
                  </Suspense>
                }
              />
              {/* Convert & Transform Tools */}
              <Route
                path="/tools/yaml-converter"
                element={
                  <Suspense fallback={<Loading />}>
                    <YAMLConverter />
                  </Suspense>
                }
              />
              <Route
                path="/tools/csv-converter"
                element={
                  <Suspense fallback={<Loading />}>
                    <CSVConverter />
                  </Suspense>
                }
              />
              <Route
                path="/tools/base64-tools"
                element={
                  <Suspense fallback={<Loading />}>
                    <Base64Tools />
                  </Suspense>
                }
              />
              <Route
                path="/tools/jwt-decoder"
                element={
                  <Suspense fallback={<Loading />}>
                    <JWTDecoder />
                  </Suspense>
                }
              />
              <Route
                path="/tools/schema-generator"
                element={
                  <Suspense fallback={<Loading />}>
                    <SchemaGenerator />
                  </Suspense>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
