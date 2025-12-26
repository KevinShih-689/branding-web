'use client';

import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  colorSchemeSelector: 'data-theme',
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: '#0b2e40',
          secondary: '#758350',
          disabled: '#9e9e9e',
        },
        primary: {
          main: '#7bc2e0',
          light: '#a9dcf2',
          dark: '#5aa3c0',
          contrastText: '#15425e',
        },
        secondary: {
          main: '#758350',
        },
        error: {
          main: '#c03120',
          light: '#e66a5c',
          dark: '#962619',
        },
        warning: {
          main: '#e9982d',
          light: '#ffcc80',
          dark: '#b8751e',
          contrastText: '#663d0e',
        },
        info: {
          main: '#8bc6e0',
          light: '#bce0f0',
          dark: '#6aa6bf',
          contrastText: '#1a5366',
        },
        success: {
          main: '#87a820',
          light: '#badd6b',
          dark: '#76941b',
          contrastText: '#394d0b',
        },
        background: {
          default: '#dddddd',
          paper: '#f5f5f5',
        },
      },
    },
    dark: {
      palette: {
        text: {
          primary: '#e8f2f7',
          secondary: '#b8c9a8',
          disabled: '#9e9e9e',
        },
        primary: {
          main: '#8dd1ec',
          light: '#4a7a8c',
          dark: '#a3d9f0',
          contrastText: '#0b2e40',
        },
        secondary: {
          main: '#9aad6f',
        },
        error: {
          main: '#f28b82',
          light: '#fadbd8',
          dark: '#e57373',
          contrastText: '#42100a',
        },
        warning: {
          main: '#ffb74d',
          light: '#ffecb3',
          dark: '#f57c00',
          contrastText: '#4d2f0b',
        },
        info: {
          main: '#4fc3f7',
          light: '#e1f5fe',
          dark: '#0288d1',
          contrastText: '#0e3642',
        },
        success: {
          main: '#81c784',
          light: '#e8f5e9',
          dark: '#388e3c',
          contrastText: '#263308',
        },
        background: {
          default: '#0f1419',
          paper: '#1a2837',
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
    allVariants: {
      letterSpacing: '0.04em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: '0.04em',
        },
      },
    },
  },
});

export default theme;
