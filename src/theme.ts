'use client'
import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  palette: {
    text: {
      primary: '#333333',
      secondary: '#333333'
    },
    error: {
      main: '#eb4a46'
    },
    primary: {
      main: '#00c8b3',
      contrastText: '#ffffff'
    },
    action: {
      disabledBackground: '#f6f6f6',
      disabled: '#dddcdc'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        colorPrimary: '#00c8b3',
        root: {
          textTransform: 'none',
          borderRadius: 24,
          '&:hover:not(.MuiButton-outlined)': {
            opacity: 0.7,
            backgroundColor: '#00c8b3'
          },
          '&.Mui-disabled': {
            backgroundColor: '#f6f6f6',
            color: '#dddcdc'
          },
          '&.MuiButton-containedPrimary&.MuiButton-loading': {
            backgroundColor: '#00c8b3',
            color: 'transparent'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#333333',
          fontWeight: 600,
          '&:not(&.Mui-error)::after': {
            borderBottom: '2px solid #efeeed!important'
          },
          '&:not(&.Mui-error)::before': {
            borderBottom: '1px solid #efeeed!important'
          },
          '&:focus-within': {
            color: '#333333'
          },
          '&.Mui-error': {
            borderBottom: '1px solid #eb4a46'
          },
          '&.Mui-focused': {
            borderColor: '#efeeed'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#efeeed',
          '&.Mui-focused': {
            color: '#333333'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { color: '#eb4a46' }
      }
    }
  }
})

export default theme
