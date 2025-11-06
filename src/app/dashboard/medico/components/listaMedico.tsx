"use client";

import { useEffect, useState } from "react";

type Medico = {
  idMedico: number;
  crm: string;
  nomeMedico: string;
  especialidade: string;
};

interface ListaMedicoProps {
  onNovo: () => void;
  onEditar: (medico: Medico) => void;
}

export default function ListaMedico({ onNovo, onEditar }: ListaMedicoProps) {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMedicos() {
    try {
      const res = await fetch("http://localhost:8080/mindev/medico");
      const data = await res.json();
      setMedicos(data || []);
    } catch (err) {
      console.error("Erro ao carregar medicos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedicos();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este medico?")) return;
    await fetch(`http://localhost:8080/mindev/medico/${id}`, { method: "DELETE" });
    fetchMedicos();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando medicos...</p>;

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
              <th className="p-3 text-left">CRM</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Especialidade</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((p) => (
              <tr
                key={p.idMedico}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.crm}</td>
                <td className="p-3">{p.nomeMedico}</td>
                <td className="p-3">{p.especialidade}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idMedico)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {medicos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhum medico encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
