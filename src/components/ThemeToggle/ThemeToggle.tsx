'use client';

import { useEffect, useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton size='large' disabled color='primary'>
        <Brightness4Icon fontSize='large' />
      </IconButton>
    );
  }

  return (
    <IconButton
      size='large'
      onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark');
      }}
      color='primary'
    >
      {mode === 'dark' ? <Brightness7Icon fontSize='large' /> : <Brightness4Icon fontSize='large' />}
    </IconButton>
  );
}
