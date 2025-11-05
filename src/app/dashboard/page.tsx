"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // ✅ Verificação de login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const buttons = [
    { label: "Paciente", path: "/dashboard/paciente" },
    { label: "Acompanhante", path: "/dashboard/acompanhante" },
    { label: "Médico", path: "/dashboard/medico" },
    { label: "Atendimento", path: "/dashboard/atendimento" },
    { label: "Atendimento P.", path: "/dashboard/presencial" },
    { label: "Teleatendimento", path: "/dashboard/teleatendimento" },
    { label: "Terapia", path: "/dashboard/terapia" },
    { label: "Endereço", path: "/dashboard/endereco" },
    { label: "Encaminhamento", path: "/dashboard/encaminhamento" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold tracking-wide mb-4 text-center text-orange-500">
        DASHBOARD DE LINKS
      </h1>
      <div className="w-40 h-[1px] bg-neutral-700 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => router.push(btn.path)}
            className="bg-zinc-900 hover:bg-orange-600 transition text-sm sm:text-base font-medium py-3 rounded-full"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}