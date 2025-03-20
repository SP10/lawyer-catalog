'use client';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-montserrat)',
    h1: {
      fontSize: defaultTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(36),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(30),
      lineHeight: 1.2,
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(24),
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 800,
    },
    subtitle2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 500,
    },
    body1: {
      fontSize: defaultTheme.typography.pxToRem(14),
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 400,
    },
    caption: {
      fontSize: defaultTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  palette: {
    text: {
      primary: '#000',
    },
    primary: {
      main: '#011640'
    },
    secondary: {
      main: '#03A6A6'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
      styleOverrides: {},
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 900,
          color: '#fff', // Змінено на білий колір
          '&:hover': {
            color: '#fff' // Змінено, щоб залишався білим при наведенні
          }
        },
        text: {
          color: '#011640', // Змінено на білий колір
          '&:hover': {
            color: '#03A6A6' // Змінено, щоб залишався білим при наведенні
          }
        },
        outlined:{
          color: '#011640', // Змінено на білий колір
          borderColor: '#011640', // Змінено на білий колір
          '&:hover': {
            color: '#03A6A6', // Змінено, щоб залишався білим при наведенні
            borderColor: '#03A6A6' // Змінено, щоб залишався білим при наведенні
          }
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
        }
      }
    }
  }
});

export default theme;
