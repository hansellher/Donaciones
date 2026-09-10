"use client";

import { useState } from "react";
import {
  CrossmintProvider,
  CrossmintEmbeddedCheckout,
} from "@crossmint/client-sdk-react-ui";

import { createOrder } from "../actions/createOrder";

const CLIENT_API_KEY =
  process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SIDE_API_KEY || "";

const DONATION_WALLET =
  process.env.NEXT_PUBLIC_DONATION_WALLET || "";

export default function DonationCheckout() {
  const [amount, setAmount] = useState("10");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<{
    orderId: string;
    clientSecret: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDonate() {
    setError("");

    if (!email) {
      setError("Introduce tu correo electrónico.");
      return;
    }

    if (!DONATION_WALLET) {
      setError("La wallet de donaciones todavía no está configurada.");
      return;
    }

    const value = Number(amount);

    if (!Number.isFinite(value) || value < 1) {
      setError("La donación mínima es de $1.");
      return;
    }

    try {
      setLoading(true);

      const result = await createOrder({
        walletAddress: DONATION_WALLET,
        receiptEmail: email,
        amount: value.toFixed(2),
      });

      setOrder({
        orderId: result.order.orderId,
        clientSecret: result.clientSecret,
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo iniciar la donación."
      );
    } finally {
      setLoading(false);
    }
  }

  if (order) {
    return (
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold">
          Completa tu donación
        </h2>

        <CrossmintProvider apiKey={CLIENT_API_KEY}>
          <CrossmintEmbeddedCheckout
            orderId={order.orderId}
            clientSecret={order.clientSecret}
            payment={{
              receiptEmail: email,
              crypto: {
                enabled: false,
              },
              fiat: {
                enabled: true,
              },
              defaultMethod: "fiat",
            }}
          />
        </CrossmintProvider>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">

      <h2 className="text-2xl font-bold">
        Haz una donación
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Elige cuánto quieres aportar.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {["5", "10", "20", "30", "50", "100"].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setAmount(value)}
            className={`rounded-xl border px-4 py-3 font-semibold transition ${
              amount === value
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white hover:border-indigo-400"
            }`}
          >
            ${value}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium">
          Otro monto
        </label>

        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Cantidad en USD"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium">
          Correo electrónico
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleDonate}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Preparando donación..."
          : `Donar $${amount || "0"}`}
      </button>

      <p className="mt-4 text-center text-xs text-slate-400">
        El pago se procesa de forma segura mediante Crossmint.
      </p>
    </div>
  );
}
