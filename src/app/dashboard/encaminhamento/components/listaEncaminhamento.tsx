"use client";

import { useEffect, useState } from "react";

type Encaminhamento = {
  idEncaminhamento: number;
  idPaciente: string;
  destino: string;
  motivoEncaminhamento: string;
};

interface ListaEncaminhamentoProps {
  onNovo: () => void;
  onEditar: (endereco: Encaminhamento) => void;
}

export default function ListaEncaminhamento({ onNovo, onEditar }: ListaEncaminhamentoProps) {
  const [encaminhamentos, setEncaminhamentos] = useState<Encaminhamento[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEncaminhamento() {
    try {
      const res = await fetch("http://localhost:8080/mindev/encaminhamento");
      const data = await res.json();
      setEncaminhamentos(data || []);
    } catch (err) {
      console.error("Erro ao carregar encaminhamentos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEncaminhamento();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este encaminhamento?")) return;
    await fetch(`http://localhost:8080/mindev/encaminhamento/${id}`, { method: "DELETE" });
    fetchEncaminhamento();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando encaminhamento...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Encaminhamento
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Id Paciente</th>
              <th className="p-3 text-left">Destino</th>
              <th className="p-3 text-left">Motivo do Encaminhamento</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {encaminhamentos.map((p) => (
              <tr
                key={p.idPaciente}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.idPaciente}</td>
                <td className="p-3">{p.destino}</td>
                <td className="p-3">{p.motivoEncaminhamento}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idEncaminhamento)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {encaminhamentos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhum encaminhamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
