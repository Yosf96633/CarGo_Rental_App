
import VerificationEmail from '@/Components/verify-code-template';
import { Resend } from 'resend';
import {ApiResponse} from "@/types/apiResponse"
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationCode(email:string , username:string , verifyCode:string):Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verification Code',
      react: VerificationEmail({username:username , otp:verifyCode}),
    });
    return {
        success:true,
        message:`Verification code send successfully to ${email}`,
    }

  } catch (error) {
    return {
        success:false,
        message:`Error while sending verification code to ${email}`
    }
  }
}
