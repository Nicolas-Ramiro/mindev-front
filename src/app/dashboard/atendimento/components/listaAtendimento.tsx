"use client";

import { useEffect, useState } from "react";
import { Atendimento } from "../page";

interface ListaAtendimentoProps {
  onNovo: () => void;
  onEditar: (atendimento: Atendimento) => void;
}

export default function ListaAtendimento({ onNovo, onEditar }: ListaAtendimentoProps) {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/mindev/atendimento")
      .then((res) => res.json())
      .then(setAtendimentos)
      .catch((err) => console.error("Erro ao buscar atendimentos:", err));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este atendimento?")) return;

    const res = await fetch(`http://localhost:8080/mindev/atendimento/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Atendimento excluído com sucesso!");
      setAtendimentos((prev) => prev.filter((a) => a.idAtendimento !== id));
    } else {
      alert("Erro ao excluir atendimento.");
    }
  }

  return (
    <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lista de Atendimentos</h2>
        <button
          onClick={onNovo}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Novo Atendimento
        </button>
      </div>

      {atendimentos.length === 0 ? (
        <p className="text-neutral-400 text-center">Nenhum atendimento cadastrado.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-700 text-orange-400">
              <th className="p-2">ID</th>
              <th className="p-2">Paciente</th>
              <th className="p-2">Médico</th>
              <th className="p-2">Data</th>
              <th className="p-2">Especialidade</th>
              <th className="p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((a) => (
              <tr key={a.idAtendimento} className="border-b border-neutral-700 hover:bg-neutral-700/40 transition">
                <td className="p-2">{a.idAtendimento}</td>
                <td className="p-2">{a.idPaciente}</td>
                <td className="p-2">{a.idMedico}</td>
                <td className="p-2">{a.data}</td>
                <td className="p-2">{a.especialidade}</td>
                <td className="p-2 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(a)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-white transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(a.idAtendimento!)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
