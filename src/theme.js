import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    whatsapp: {
      50: '#E8F5E8',
      100: '#C2E5C2',
      200: '#9BD59B',
      300: '#74C474',
      400: '#4DB44D',
      500: '#25D366', // WhatsApp Green
      600: '#1DA851',
      700: '#157D3C',
      800: '#0E5228',
      900: '#062714',
    },
    telegram: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#0088CC', // Telegram Blue
      600: '#0277BD',
      700: '#01579B',
      800: '#003C71',
      900: '#002147',
    },
    twitter: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#1DA1F2', // Twitter Blue
      600: '#1976D2',
      700: '#1565C0',
      800: '#0D47A1',
      900: '#0A2E5C',
    },
    facebook: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#1877F2', // Facebook Blue
      600: '#166FE5',
      700: '#1464D8',
      800: '#1258CB',
      900: '#0E47A1',
    },
    linkedin: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#0077B5', // LinkedIn Blue
      600: '#006BA1',
      700: '#005E8D',
      800: '#004F79',
      900: '#003F65',
    },
  },
});

export default theme;