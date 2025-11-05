"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BotaoDashboard() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="flex items-center gap-2 bg-neutral-700 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-md transition-colors"
    >
      <ArrowLeft size={18} />
      Voltar ao Dashboard
    </button>
  );
}
