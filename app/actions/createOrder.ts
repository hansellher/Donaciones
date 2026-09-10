"use server";

const USDC_TOKEN_LOCATOR =
  "base-sepolia:0x036CbD53842c5426634e7929541eC2318f3dCF7e";

interface CreateOrderParams {
  walletAddress: string;
  receiptEmail: string;
  amount: string;
}

export async function createOrder({
  walletAddress,
  receiptEmail,
  amount,
}: CreateOrderParams) {
  const serverApiKey =
    process.env.CROSSMINT_SERVER_SIDE_API_KEY;

  if (!serverApiKey) {
    throw new Error(
      "CROSSMINT_SERVER_SIDE_API_KEY no está configurada."
    );
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount < 1) {
    throw new Error("Cantidad de donación inválida.");
  }

  const response = await fetch(
    "https://staging.crossmint.com/api/2022-06-09/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": serverApiKey,
      },
      body: JSON.stringify({
        lineItems: [
          {
            tokenLocator: USDC_TOKEN_LOCATOR,
            executionParameters: {
              mode: "exact-in",
              amount: numericAmount.toFixed(2),
            },
          },
        ],
        payment: {
          method: "card",
          receiptEmail,
        },
        recipient: {
          walletAddress,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error?.message || "No se pudo crear la donación."
    );
  }

  return response.json();
}
