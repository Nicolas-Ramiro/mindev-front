"use client";

import { useState } from "react";
import FormAcompanhante from "... @/app/dashboard/acompanhante/components/formAcompanhante";
import ListaAcompanhante from "... @/app/dashboard/acompanhante/components/listaAcompanhante";
import BotaoDashboard from "../../../components/botaoDashboard";

type Acompanhante = {
  idAcompanhante?: number;
  idPaciente: number | string;
  nomeAcompanhante: string;
  parentesco: string;
};

export default function AcompanhantePage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [acompanhanteEdit, setAcompanhanteEdit] = useState<Acompanhante | null>(null);
  
  return (
  <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
    <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Acompanhantes</h1>
    
    {modo === "lista" ? (
      <ListaAcompanhante
      onNovo={() => setModo("form")}
      onEditar={(acompanhante) => {
        setAcompanhanteEdit(acompanhante);
        setModo("form");
      }}
        />
      ) : (
      <FormAcompanhante
      acompanhante={acompanhanteEdit}
      onCancel={() => {
        setAcompanhanteEdit(null);
        setModo("lista");
      }}
      onSuccess={() => {
        setAcompanhanteEdit(null);
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
