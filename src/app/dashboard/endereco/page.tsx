"use client";

import { useState } from "react";
import ListaEndereco from "... @/app/dashboard/endereco/components/listaEndereco";
import FormEndereco from "... @/app/dashboard/endereco/components/formEndereco";
import BotaoDashboard from "../../../components/botaoDashboard";

type Endereco = {
  idEndereco?: number;
  idPaciente: number | string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  estado: string;
};

export default function EnderecoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [enderecoEdit, setEnderecoEdit] = useState<Endereco | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Endereço</h1>

      {modo === "lista" ? (
        <ListaEndereco
          onNovo={() => setModo("form")}
          onEditar={(endereco) => {
            setEnderecoEdit(endereco);
            setModo("form");
          }}
        />
      ) : (
        <FormEndereco
          endereco={enderecoEdit}
          onCancel={() => {
            setEnderecoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setEnderecoEdit(null);
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
