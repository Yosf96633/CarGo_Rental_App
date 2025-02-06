'use client'
import React , {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { car } from "../../../public/image";
import { signInSchema } from "@/zodSchemas/signInSchema";
import {Eye , EyeOffIcon} from "lucide-react"
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async () => {};
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });
  return (
    <div className=" w-screen min-h-screen">
      <div className=" flex h-screen justify-center items-center px-16 gap-12">
        {/* SignIn section */}
        <div className=" space-y-4">
          <h1 className=" text-6xl font-extrabold text-[#1E71CD]">Hit the Road Again!</h1>
          <p className=" text-2xl font-light text-[#1E71CD]">Sign in to rent your next ride in just a few clicks.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jhon.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className="relative w-full">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10" // Extra padding for icon
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
              <div className=" flex justify-center items-center space-x-8">
                      <div className=" border border-[#1E71CD] w-28"></div>
                      <div className=" text-[#1E71CD]">or</div>
                      <div className=" border border-[#1E71CD] w-28"></div>
                  </div>
                  <Button onClick={()=>{
                    signIn("google" , {
                      redirect:true,
                      callbackUrl:"http://localhost:3000"
                    })
                  }} className=" flex justify-center items-center border bg-[#1E71CD] text-white">
                      <p>Sign in with</p><FcGoogle/>
                  </Button>
            </form>
          </Form>
        </div>
        {/* Car image */}
        <div className=" flex justify-center items-center pl-12">
           <img src={car.src} alt="Car image" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
