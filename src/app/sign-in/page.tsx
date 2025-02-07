"use client";
import React, { useState } from "react";
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
import { signInSchema } from "@/zodSchemas/signInSchema";
import { Eye, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async () => {};
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });
  return (
    <div className=" container w-screen h-screen space-y-2 size-72 flex flex-col items-center justify-center">
      <h1 className=" text-4xl text-center font-extrabold text-black ">
        Hit the Road Again!
      </h1>
      <p className=" text-xl  text-center font-light text-black">
        Sign in to rent your next ride in just a few clicks.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jhon.doe@example.com"
                    {...field}
                  />
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
                      placeholder="********"
                      className="pr-10" 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex justify-center items-center">
            <Button onClick={()=>{
              signIn("credentials" , {
                redirect:false,
              })
            }} type="submit">Login</Button>
          </div>
          <p className=" text-center">Create a new account? <Link className=" text-blue-500" href={"/sign-up"}>Sign up</Link></p>
          <div className=" flex justify-center items-center space-x-8">
            <div className=" border-b border-b-black w-28"></div>
            <div className=" text-black">or</div>
            <div className=" border-b border-b-black w-28"></div>
          </div>
         <div className=" flex justify-center items-center">
         <Button
            onClick={() => {
              signIn("google", {
                redirect: true,
                callbackUrl: "http://localhost:3000",
              });
            }}
            className=" flex justify-center items-center border text-white"
          >
            <p>Continue with</p>
            <FcGoogle />
          </Button>
         </div>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
