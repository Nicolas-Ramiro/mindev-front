"use client";

import { useState } from "react";
import ListaPaciente from "... @/app/dashboard/paciente/components/ListaPaciente";
import FormPaciente from "... @/app/dashboard/paciente/components/formPaciente";
import BotaoDashboard from "../../../components/botaoDashboard";

type Paciente = {
  idPaciente?: number;
  nome: string;
  idade: number | string;
  email: string;
  cpf: number | string;
  telefone: number | string;
};

export default function PacientePage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Pacientes</h1>

      {modo === "lista" ? (
        <ListaPaciente
          onNovo={() => setModo("form")}
          onEditar={(paciente) => {
            setPacienteEdit(paciente);
            setModo("form");
          }}
        />
      ) : (
        <FormPaciente
          paciente={pacienteEdit}
          onCancel={() => {
            setPacienteEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setPacienteEdit(null);
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
