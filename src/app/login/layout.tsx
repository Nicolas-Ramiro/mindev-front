import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center mt-5 justify-center min-h-screen text-white bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-orange-500">Mindev 🧠</h1>
        <p className="text-neutral-400 text-sm">
          Acesso restrito ao ambiente de desenvolvedores
        </p>
      </header>
      {children}
    </div>
  );
}
