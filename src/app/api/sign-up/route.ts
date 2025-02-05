import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import { signUpSchema } from "@/zodSchemas/signUpSchema";
import { ZodError } from "zod";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
export async function POST(req: Request) {
  try {
    await dbConnect();

  } catch (error) {
    
}}
