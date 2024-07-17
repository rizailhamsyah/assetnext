import ReactDOM from 'react-dom/client';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import '@/index.css'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const session:Session | null = null; 
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <SessionProvider session={session}>
    {/* <React.StrictMode> */}
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    {/* </React.StrictMode> */}
  </SessionProvider>
);