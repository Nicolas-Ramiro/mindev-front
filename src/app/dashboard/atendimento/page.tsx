"use client";

import { useState } from "react";
import ListaAtendimento from "... @/app/dashboard/atendimento/components/listaAtendimento";
import FormAtendimento from "... @/app/dashboard/atendimento/components/formAtendimento";
import BotaoDashboard from "../../../components/botaoDashboard";

export default function AtendimentoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [atendimentoEdit, setAtendimentoEdit] = useState<Atendimento | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Atendimentos</h1>

      {modo === "lista" ? (
        <ListaAtendimento
          onNovo={() => setModo("form")}
          onEditar={(atendimento) => {
            setAtendimentoEdit(atendimento);
            setModo("form");
          }}
        />
      ) : (
        <FormAtendimento
          atendimento={atendimentoEdit}
          onCancel={() => {
            setAtendimentoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setAtendimentoEdit(null);
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

export interface Atendimento {
  idAtendimento?: number;
  idPaciente: number | string;
  idMedico: number | string;
  data: string;
  especialidade: string;
}
