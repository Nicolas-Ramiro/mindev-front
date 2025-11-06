"use client";

import { useState } from "react";
import ListaEncaminhamento from "... @/app/dashboard/encaminhamento/components/listaEncaminhamento";
import FormEncaminhamento from "... @/app/dashboard/encaminhamento/components/formEncaminhamento";
import BotaoDashboard from "../../../components/botaoDashboard";

type Encaminhamento = {
  idEncaminhamento?: number;
  idPaciente: number | string;
  destino: string;
  motivoEncaminhamento: string;
};

export default function EncaminhamentoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [encaminhamentoEdit, setEncaminhamentoEdit] = useState<Encaminhamento | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Encaminhamentos</h1>

      {modo === "lista" ? (
        <ListaEncaminhamento
          onNovo={() => setModo("form")}
          onEditar={(encaminhamento) => {
            setEncaminhamentoEdit(encaminhamento);
            setModo("form");
          }}
        />
      ) : (
        <FormEncaminhamento
          encaminhamento={encaminhamentoEdit}
          onCancel={() => {
            setEncaminhamentoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setEncaminhamentoEdit(null);
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
