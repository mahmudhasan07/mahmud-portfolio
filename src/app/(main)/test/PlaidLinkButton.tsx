"use client";
import { useState, useEffect } from "react";

export default function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    // Request link token from backend when component loads
    async function createLinkToken() {
      const res = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });
      const data = await res.json();
      setLinkToken(data.link_token);
    }

    createLinkToken();
  }, []);

  const openPlaidLink = () => {
    if (!linkToken) return;

    const handler = window.Plaid.create({
      token: linkToken,
      onSuccess: async (public_token : any) => {
        // Send public_token to backend to exchange for access_token
        const res = await fetch("/api/plaid/exchange-public-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_token }),
        });

        const data = await res.json();
        console.log("Access token:", data.access_token);
        
        // Proceed to fetch data like transactions, income, etc.
      },
      onExit: (err : any) => {
        if (err) {
          console.error("Plaid Link Error:", err);
        }
      },
    });

    handler.open();
  };

  return (
    <button onClick={openPlaidLink} className="btn btn-primary">
      Link Bank Account
    </button>
  );
}
