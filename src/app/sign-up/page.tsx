"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { signUpSchema } from "@/zodSchemas/signUpSchema";
import Link from "next/link";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
const SignUp = () => {
  const {toast} = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),

  });
  const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
    try {
      // Remove dbConnect(); API route will handle it
      const response = await axios.post("/api/sign-up", data);
      console.log(response.data);
      toast({
        title: "Success",
        description: response?.data?.message
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className=" container w-screen h-screen space-y-2 size-72 flex flex-col items-center justify-center">
      <h1 className=" text-4xl text-center font-extrabold text-black ">
        Create Your Account
      </h1>
      <p className=" text-xl  text-center font-light text-black">
        Join us and start renting cars effortlessly.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <Button type="submit">
              Sign up
            </Button>
          </div>
          <p className=" text-center">
            Already have an account?{" "}
            <Link className=" text-blue-500" href={"/sign-in"}>
              Login
            </Link>
          </p>
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

export default SignUp;
