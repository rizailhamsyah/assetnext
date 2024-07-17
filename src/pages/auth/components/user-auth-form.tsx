"use client"

import { HTMLAttributes, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { signIn, useSession } from 'next-auth/react'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

interface FormData {
  username: string;
  password: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginFail, setIsLoginFail] = useState(false)
  const {register, handleSubmit, watch} = useForm<FormData>()

  // const { data: session } = useSession()

  const onSubmit = async (data:any) => {
    setIsLoginFail(false);
    setIsLoading(true)

    // try {
      const login = await signIn("credentials", {
        ...data,
        redirect: false
      });

      console.log("Login", data);

      setIsLoading(false);

      if (!login) {
        setIsLoginFail(true);
        // toast({
        //   variant: "destructive",
        //   title: "Unauthorized!",
        //   description: "Username / Password Salah!"
        // });
        return;
      }

      // Use router.push for client-side navigation
      const callbackUrlMatch = window.location.search.match(/callbackUrl=([^&]*)/);
      const callbackUrl = callbackUrlMatch ? decodeURIComponent(callbackUrlMatch[1]) : "/sign-in";

      window.location.href = callbackUrl;
    // } catch (error) {
    //   console.error("Login error", error);
    //   setIsLoading(false);
    //   setIsLoginFail(true);
    //   toast({
    //     variant: "destructive",
    //     title: "Error!",
    //     description: "An error occurred during login. Please try again."
    //   });
    // }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              disabled={isLoading}
              {...register("username", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
              {...register("password", { required: true })}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}