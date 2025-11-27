"use client";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function createLinkToken() {
      const res = await fetch("http://localhost:7010/api/v1/plaid/create-link-token", {
        method: "POST",
      });
      const data = await res.json();
      setLinkToken(data?.data?.link_token);
    }

    createLinkToken();
  }, []);

  const openPlaidLink = () => {
    if (!linkToken) return;
    if (!window.Plaid) {
      console.error("Plaid script not loaded yet!");
      return;
    }

    const handler = window.Plaid.create({
      token: linkToken,
      onSuccess: async (public_token: any) => {
        const res = await fetch("http://localhost:7010/api/v1/plaid/exchange-public-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_token }),
        });

        const data = await res.json();
        console.log("Access token:", data.access_token);
      },
      onExit: (err: any) => {
        if (err) console.error("Plaid Link Error:", err);
      },
    });

    handler.open();
  };

  return (
    <>
      {/* Load Plaid script */}
      <Script
        src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Plaid script loaded")}
      />

      <button onClick={openPlaidLink} className="btn btn-primary">
        Link Bank Account
      </button>
    </>
  );
}
