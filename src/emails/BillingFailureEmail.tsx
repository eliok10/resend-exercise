import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface BillingFailureEmailProps {
  customerName: string;
  last4?: string; 
}

export function BillingFailureEmail({
  customerName,
  last4,
}: BillingFailureEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f6f9fc",
          padding: "20px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          <Heading style={{ fontSize: "24px", marginBottom: "12px" }}>
            We couldn't process your payment
          </Heading>

          <Text style={{ margin: "0 0 12px 0" }}>Hi {customerName},</Text>

          <Text style={{ margin: "0 0 12px 0" }}>
            We tried to charge your payment method
            {last4 ? ` ending in ${last4}` : ""}, but the payment failed.
          </Text>

          <Text style={{ margin: "0 0 12px 0" }}>
            Please update your billing details to avoid any interruption to
            your service.
          </Text>

          <Section
            style={{
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            <a
              href="https://your-app.com/billing"
              style={{
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 500,
                backgroundColor: "#111827",
                color: "#ffffff",
              }}
            >
              Update billing details
            </a>
          </Section>

          <Text style={{ fontSize: "12px", color: "#6b7280" }}>
            If you already updated your payment method, you can ignore this
            message.
          </Text>

          <Hr style={{ marginTop: "20px", marginBottom: "12px" }} />

          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            This is a billing notification from YourApp.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
