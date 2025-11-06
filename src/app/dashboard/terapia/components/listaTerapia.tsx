"use client";

import { useEffect, useState } from "react";

type Terapia = {
  idTerapia: number;
  especialidade: string;
  frequencia: string;
  terapeutaResponsavel: string;
};

interface ListaTerapiaProps {
  onNovo: () => void;
  onEditar: (terapia: Terapia) => void;
}

export default function ListaTerapia({ onNovo, onEditar }: ListaTerapiaProps) {
  const [terapias, setTerapias] = useState<Terapia[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTerapias() {
    try {
      const res = await fetch("https://mindev-java-api.onrender.com/mindev/terapia");
      const data = await res.json();
      setTerapias(data || []);
    } catch (err) {
      console.error("Erro ao carregar terapias:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTerapias();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta terapia?")) return;
    await fetch(`https://mindev-java-api.onrender.com/mindev/terapia/${id}`, { method: "DELETE" });
    fetchTerapias();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando terapias...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Nova Terapia
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Especialidade</th>
              <th className="p-3 text-left">Frequência</th>
              <th className="p-3 text-left">Terapeuta Responsavel</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {terapias.map((p) => (
              <tr
                key={p.idTerapia}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.especialidade}</td>
                <td className="p-3">{p.frequencia}</td>
                <td className="p-3">{p.terapeutaResponsavel}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idTerapia)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {terapias.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhuma terapia encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
