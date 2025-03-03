import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  colors: {
    gray: {
      900: '#111827',
      800: '#1F2937',
      700: '#374151',
      600: '#4B5563',
      500: '#6B7280',
      400: '#9CA3AF',
      300: '#D1D5DB',
      200: '#E5E7EB',
      100: '#F3F4F6',
      50: '#F9FAFB',
    },
    blue: {
      900: '#1E3A8A',
      800: '#1E40AF',
      700: '#1D4ED8',
      600: '#2563EB',
      500: '#3B82F6',
      400: '#60A5FA',
      300: '#93C5FD',
      200: '#BFDBFE',
      100: '#DBEAFE',
      50: '#EFF6FF',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      variants: {
        solid: {
          bg: 'blue.500',
          color: 'white',
          _hover: {
            bg: 'blue.600',
          },
        },
        outline: {
          borderColor: 'blue.500',
          color: 'blue.500',
          _hover: {
            bg: 'blue.500',
            color: 'white',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          borderRadius: 'xl',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.700',
          },
          td: {
            borderColor: 'gray.700',
          },
        },
      },
    },
  },
});

export default theme;
