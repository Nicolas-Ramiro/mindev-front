"use client";

import { useEffect, useState } from "react";

type Acompanhante = {
  idAcompanhante?: number;
  idPaciente: number;
  nomeAcompanhante: string;
  parentesco: string;
};

interface ListaAcompanhanteProps {
  onNovo: () => void;
  onEditar: (acompanhante: Acompanhante) => void;
}

export default function ListaAcompanhante({ onNovo, onEditar }: ListaAcompanhanteProps) {
  const [acompanhantes, setAcompanhantes] = useState<Acompanhante[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAcompanhantes() {
    try {
      const res = await fetch("http://localhost:8080/mindev/acompanhante");
      const data = await res.json();
      setAcompanhantes(data || []);
    } catch (err) {
      console.error("Erro ao carregar acompanhantes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAcompanhantes();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este acompanhante?")) return;
    await fetch(`http://localhost:8080/mindev/acompanhante/${id}`, { method: "DELETE" });
    fetchAcompanhantes();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando acompanhantes...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Paciente
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Id Paciente</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Parentesco</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {acompanhantes.map((p) => (
              <tr
                key={p.idPaciente}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.idPaciente}</td>
                <td className="p-3">{p.nomeAcompanhante}</td>
                <td className="p-3">{p.parentesco}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idPaciente)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {acompanhantes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhum acompanhante encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
