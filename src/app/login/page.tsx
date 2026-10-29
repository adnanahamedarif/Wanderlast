


"use client"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function LogInPage() {


  const handleEmailLogIn = async (e:React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {email:string, password:string}


    const {data, error} = await authClient.signIn.email({
      ...user,
    })
    if(data){
      redirect('/')
    }
    if(error){
      console.log(error);
    }
  }



  return (
<div className="mx-auto my-10 flex w-full max-w-md px-4 ">
          <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Resume your adventure with Wanderlust
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogIn}>
            <FieldGroup>


              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>




              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">LogIn</Button>
              
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">SignUp</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
