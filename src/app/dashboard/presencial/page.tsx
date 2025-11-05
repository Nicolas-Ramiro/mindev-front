"use client";

import { useState } from "react";
import ListaPresencial from "... @/app/dashboard/presencial/components/listaPresencial";
import FormPresencial from "... @/app/dashboard/presencial/components/formPresencial";
import BotaoDashboard from "../../../components/botaoDashboard";

export default function PresencialPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [presencialEdit, setPresencialEdit] = useState<AtendimentoPresencial | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Atendimento Presencial</h1>

      {modo === "lista" ? (
        <ListaPresencial
          onNovo={() => setModo("form")}
          onEditar={(presencial) => {
            setPresencialEdit(presencial);
            setModo("form");
          }}
        />
      ) : (
        <FormPresencial
          presencial={presencialEdit}
          onCancel={() => {
            setPresencialEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setPresencialEdit(null);
            setModo("lista");
          }}
        />
      )}
    <div className="flex justify-between items-center mb-6 mt-6">
      <BotaoDashboard/>
    </div>
    </div>
  );
}

type AtendimentoPresencial = {
  idAtendimentoPre?: number;
  idAtendimento?: number;
  idPaciente: number;
  idMedico: number;
  data: string;
  especialidade: string;
  local: string;
  sala: string;
  horario: string;
  acompanhanteNecessario: string;
};

