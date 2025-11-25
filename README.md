Getting Started

**1. Clone the repo**

git clone https://github.com/theelioproject/resend-exercise.git

cd resend-exercise

**2. Install dependencies**

npm install

**3. Add your API key**

Create a .env.local file: RESEND_API_KEY=your_api_key_here

**4. Start the dev server**

    npm run dev
    Visit: http://localhost:3000


Click the button to send a test billing failure email.


**How the Email Is Sent**

The API route lives at: app/api/send-billing-failure/route.ts


It does the following:

1. Reads the request body (email, customerName, last4)

2. Loads public/files/Take Home Challenge.pdf and encodes it as base64

3. Generates the email HTML using the React Email template

4. Sends everything through the Resend SDK

Example call:

await resend.emails.send({
  from: "Acme Billing <onbording@resend.dev>",
  to: [email],
  subject: "Payment failed – please update your billing details",
  react: BillingFailureEmail({ customerName, last4 }),
  attachments: [
    {
      filename: "Take Home Challenge.pdf",
      content: base64File
    }
  ]
});

**Email Template**

The template is written using React Email components: src/emails/BillingFailureEmail.tsx

It includes the customer name, the last four digits of the card, a message, and a button linking to a billing page.

**Attachment**

An example PDF is stored at: public/files/Take Home Challenge.pdf

It is read directly in the API route and sent as a base64-encoded attachment. You can replace this with any PDF if needed.

**Testing the Email**

Go to page.tsx and change the email to your own domain
For real sends, make sure your domain is verified in the Resend dashboard
Logs are available in the Resend UI
