import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BillingFailureEmail } from "@/emails/BillingFailureEmail";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email = "delivered@resend.dev",
      customerName = "John Doe",
      last4 = "4242",
    } = body || {};

    // Read PDF attachment
    const filePath = path.join(process.cwd(), "public", "files", "Take Home Challenge.pdf");
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString("base64");

    const { data, error } = await resend.emails.send({
      from: "Acme Billing <onbording@resend.dev>",
      to: [email],
      subject: "Payment failed – please update your billing details",
      attachments: [
        {
          filename: "Take Home Challenge.pdf",
          content: base64File,
        },
      ],
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
