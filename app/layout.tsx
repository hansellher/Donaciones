import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoya nuestro proyecto",
  description: "Realiza una donación para apoyar nuestro proyecto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
