"use client";

import { useState } from "react";
import ListaTerapia from "... @/app/dashboard/terapia/components/listaTerapia";
import FormTerapia from "... @/app/dashboard/terapia/components/formTerapia";
import BotaoDashboard from "../../../components/botaoDashboard";

type Terapia = {
  idTerapia?: number;
  especialidade: string;
  frequencia: string;
  terapeutaResponsavel: string;
};

export default function TerapiaPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [terapiaEdit, setTerapiaEdit] = useState<Terapia | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Terapias</h1>

      {modo === "lista" ? (
        <ListaTerapia
          onNovo={() => setModo("form")}
          onEditar={(terapia) => {
            setTerapiaEdit(terapia);
            setModo("form");
          }}
        />
      ) : (
        <FormTerapia
          terapia={terapiaEdit}
          onCancel={() => {
            setTerapiaEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setTerapiaEdit(null);
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
