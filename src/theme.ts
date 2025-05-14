'use client'
import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const colors = {
  textPrimary: '#333333',
  textSecondary: '#333333',
  error: '#eb4a46',
  primaryMain: '#00c8b3',
  primaryContrast: '#ffffff',
  disabledBg: '#f6f6f6',
  disabledText: '#dddcdc',
  borderDefault: '#efeeed'
}

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
      primary: colors.textPrimary,
      secondary: colors.textSecondary
    },
    error: {
      main: colors.error
    },
    primary: {
      main: colors.primaryMain,
      contrastText: colors.primaryContrast
    },
    action: {
      disabledBackground: colors.disabledBg,
      disabled: colors.disabledText
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        colorPrimary: colors.primaryMain,
        root: {
          textTransform: 'none',
          borderRadius: 24,
          '&:hover:not(.MuiButton-outlined)': {
            opacity: 0.7,
            backgroundColor: colors.primaryMain
          },
          '&.Mui-disabled': {
            backgroundColor: colors.disabledBg,
            color: colors.disabledText
          },
          '&.MuiButton-containedPrimary&.MuiButton-loading': {
            backgroundColor: colors.primaryMain,
            color: 'transparent'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: colors.textPrimary,
          fontWeight: 600,
          '&:not(&.Mui-error)::after': {
            borderBottom: `2px solid ${colors.borderDefault}!important`
          },
          '&:not(&.Mui-error)::before': {
            borderBottom: `1px solid ${colors.borderDefault}!important`
          },
          '&:focus-within': {
            color: colors.textPrimary
          },
          '&.Mui-error': {
            borderBottom: `1px solid ${colors.error}`
          },
          '&.Mui-focused': {
            borderColor: colors.borderDefault
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.borderDefault,
          '&.Mui-focused': {
            color: colors.textPrimary
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { color: colors.error }
      }
    }
  }
})

export default theme
