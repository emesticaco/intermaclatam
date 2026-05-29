import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intermac LATAM – Asistencia al Viajero",
  description: "Asistencia al viajero 24/7 con respaldo global en cada paso de tu aventura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
