"use client";

import { useEffect, useState } from "react";

type AtendimentoPresencial = {
  idAtendimentoPre: number;
  idAtendimento: number;
  idPaciente: number;
  idMedico: number;
  data: string;
  especialidade: string;
  local: string;
  sala: string;
  horario: string;
  acompanhanteNecessario: string;
};

interface ListaPresencialProps {
  onNovo: () => void;
  onEditar: (presencial: AtendimentoPresencial) => void;
}

export default function ListaPresencial({
  onNovo,
  onEditar,
}: ListaPresencialProps) {
  const [lista, setLista] = useState<AtendimentoPresencial[]>([]);

  async function carregar() {
    const res = await fetch("http://localhost:8080/mindev/presencial");
    const dados = await res.json();
    setLista(dados);
  }

  async function excluir(id: number) {
    if (confirm("Deseja realmente excluir este atendimento?")) {
      await fetch(`http://localhost:8080/mindev/presencial/${id}`, {
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
        <h2 className="text-2xl font-bold">Lista de Atendimentos Presenciais</h2>
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
            <th className="border border-neutral-600 px-3 py__2">Local</th>
            <th className="border border-neutral-600 px-3 py-2">Sala</th>
            <th className="border border-neutral-600 px-3 py-2">Horário</th>
            <th className="border border-neutral-600 px-3 py-2">Acomp.</th>
            <th className="border border-neutral-600 px-3 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((pre) => (
            <tr key={pre.idAtendimentoPre} className="hover:bg-neutral-700">
              <td className="border border-neutral-600 px-3 py-2">
                {pre.idAtendimentoPre}
              </td>
              <td className="border border-neutral-600 px-3 py-2">{pre.idPaciente}</td>
              <td className="border border-neutral-600 px-3 py-2">{pre.idMedico}</td>
              <td className="border border-neutral-600 px-3 py-2">{pre.data}</td>
              <td className="border border-neutral-600 px-3 py-2">{pre.local}</td>
              <td className="border border-neutral-600 px-3 py-2">{pre.sala}</td>
              <td className="border border-neutral-600 px-3 py-2">{pre.horario}</td>
              <td className="border border-neutral-600 px-3 py-2">
                {pre.acompanhanteNecessario}
              </td>
              <td className="border border-neutral-600 px-3 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEditar(pre)}
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-white font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(pre.idAtendimentoPre)}
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
