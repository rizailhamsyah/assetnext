"use client"
import { getCsrfToken } from 'next-auth/react'
import { UserAuthForm } from './components/user-auth-form'
import ViteLogo from '@/assets/vite.svg'
// import { useSession } from "next-auth/react"

export default function Login(csrfToken={getCsrfToken}) {
  // const { status: sessionStatus } = useSession();
  // if (sessionStatus === 'loading') {
  //   return <>Loading app...</>;
  // }
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            Digital Asset Management
          </div>

          <img
            src={ViteLogo}
            className='relative m-auto'
            width={301}
            height={60}
            alt='Vite'
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>Admin Interface for Managing Digital Asset Management</p>
              <footer className="text-sm">
                  <div className="flex flex-row items-center space-x-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 text-muted-foreground">
                          <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Built by <a href="https://instagram.com/rizailhamsyah28" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Riza</a>. TI PKC.</p>
                  </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your account below to log into your application
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}