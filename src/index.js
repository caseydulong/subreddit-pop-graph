import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Material UI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const forestTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66b032',
      dark: '#142806',
      light: '#1b3408',
    },
    secondary: {
      main: '#c21460',
    },
    text: {
      primary: '#f7f7d4',
    },
    background: {
      default: '#303030',
      paper: '#424242'
    },
    error: {
      main: '#f44336',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={forestTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)
