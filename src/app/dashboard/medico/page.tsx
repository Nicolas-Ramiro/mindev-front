"use client";

import { useState } from "react";
import ListaMedico from "... @/app/dashboard/medico/components/listaMedico";
import FormMedico from "... @/app/dashboard/medico/components/formMedico";
import BotaoDashboard from "../../../components/botaoDashboard";

type Medico = {
  idMedico?: number;
  crm: string;
  nomeMedico: string;
  especialidade: string;
};

export default function MedicoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Medicos</h1>

      {modo === "lista" ? (
        <ListaMedico
          onNovo={() => setModo("form")}
          onEditar={(medico) => {
            setMedicoEdit(medico);
            setModo("form");
          }}
        />
      ) : (
        <FormMedico
          medico={medicoEdit}
          onCancel={() => {
            setMedicoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setMedicoEdit(null);
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
