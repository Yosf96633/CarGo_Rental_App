import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import { signUpSchema } from "@/zodSchemas/signUpSchema";
import { ZodError } from "zod";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();
    signUpSchema.parse({ username, email, password });
    const isUserExist = await userModel.findOne({
      email: email,
    });
    if (isUserExist) {
      return Response.json(
        {
          success: false,
          message: `${email} already exist`,
        },
        {
          status: 400,
        }
      );
    }
     const hashedPassword = await bcryptjs.hash(password , 12)
     const user = await userModel.create({
      username:username,
      email:email,
      password:hashedPassword,
     })
     if(!user){
      return Response.json(
        {
          success: false,
          message: `Error while sign up. Please try again later`,
        },
        {
          status: 500,
        }
      );
     }
     return Response.json(
      {
        success: true,
        message: `Sign-up successfully.`,
        data : user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if(error instanceof ZodError){
      return Response.json({
        success:false,
        messages:error.errors.map((e)=>e.message)
      }  , {
        status:400
      })
    }
    if(error instanceof mongoose.Error){
      return Response.json({
        success:false,
        messages:error.message
      }  , {
        status:400
      })
    }
    return Response.json({
      success:false,
      message:`Internal server error`,
    }  , {
      status:500,
    })
  }
}
