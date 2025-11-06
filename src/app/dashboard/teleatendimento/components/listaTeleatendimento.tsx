"use client";

import { useEffect, useState } from "react";

type Teleatendimento = {
  idTeleatendimento: number;
  idAtendimento: number;
  idPaciente: number;
  idMedico: number;
  data: string;
  especialidade: string;
  plataforma: string;
  horario: string;
  tipoChamada: string;
  acompanhanteNecessario: "S" | "N";
};

interface ListaTeleatendimentoProps {
  onNovo: () => void;
  onEditar: (tele: Teleatendimento) => void;
}

export default function ListaTeleatendimento({
  onNovo,
  onEditar,
}: ListaTeleatendimentoProps) {
  const [lista, setLista] = useState<Teleatendimento[]>([]);

  async function carregar() {
    const res = await fetch("https://mindev-java-api.onrender.com/mindev/teleatendimento");
    const dados = await res.json();
    setLista(dados);
  }

  async function excluir(id: number) {
    if (confirm("Deseja realmente excluir este teleatendimento?")) {
      await fetch(`https://mindev-java-api.onrender.com/mindev/teleatendimento/${id}`, {
        method: "DELETE",
      });
      carregar();
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, []);

  return (
    <div className="bg-neutral-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Lista de Teleatendimentos</h2>
        <button
          onClick={onNovo}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Novo
        </button>
      </div>

      <table className="w-full border-collapse border border-neutral-700">
        <thead>
          <tr className="bg-neutral-700">
            <th className="border border-neutral-600 px-3 py-2">ID</th>
            <th className="border border-neutral-600 px-3 py-2">Paciente</th>
            <th className="border border-neutral-600 px-3 py-2">Médico</th>
            <th className="border border-neutral-600 px-3 py-2">Data</th>
            <th className="border border-neutral-600 px-3 py-2">Plataforma</th>
            <th className="border border-neutral-600 px-3 py-2">Tipo</th>
            <th className="border border-neutral-600 px-3 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((tele) => (
            <tr key={tele.idTeleatendimento} className="hover:bg-neutral-700">
              <td className="border border-neutral-600 px-3 py-2">
                {tele.idTeleatendimento}
              </td>
              <td className="border border-neutral-600 px-3 py-2">
                {tele.idPaciente}
              </td>
              <td className="border border-neutral-600 px-3 py-2">
                {tele.idMedico}
              </td>
              <td className="border border-neutral-600 px-3 py-2">{tele.data}</td>
              <td className="border border-neutral-600 px-3 py-2">
                {tele.plataforma}
              </td>
              <td className="border border-neutral-600 px-3 py-2">
                {tele.tipoChamada}
              </td>
              <td className="border border-neutral-600 px-3 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEditar(tele)}
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-white font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(tele.idTeleatendimento)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white font-semibold"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
