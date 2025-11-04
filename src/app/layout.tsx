// app/layout.tsx
import "../app/globals.css";
import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Mindev | Inovação e Empatia na Saúde Digital",
  description:
    "Plataforma de saúde digital Mindev - conectando inovação e empatia para transformar o cuidado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900 text-white">
        <Header />
        <main className="flex-grow pt-[120px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
