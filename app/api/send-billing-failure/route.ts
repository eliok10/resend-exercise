import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BillingFailureEmail } from "@/emails/BillingFailureEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email = "delivered@resend.dev", 
      customerName = "John Doe",
      last4 = "4242",
    } = body || {};

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Payment failed – please update your billing details",
      react: BillingFailureEmail({ customerName, last4 }),
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
