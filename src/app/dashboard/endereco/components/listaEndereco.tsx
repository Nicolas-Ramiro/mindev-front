"use client";

import { useEffect, useState } from "react";

type Endereco = {
  idEndereco: number;
  idPaciente: number;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  estado: string;
};

interface ListaEnderecoProps {
  onNovo: () => void;
  onEditar: (endereco: Endereco) => void;
}

export default function ListaEndereco({ onNovo, onEditar }: ListaEnderecoProps) {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEndereco() {
    try {
      const res = await fetch("https://mindev-java-api.onrender.com/mindev/endereco");
      const data = await res.json();
      setEnderecos(data || []);
    } catch (err) {
      console.error("Erro ao carregar endereços:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEndereco();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este endereço?")) return;
    await fetch(`https://mindev-java-api.onrender.com/mindev/endereco/${id}`, { method: "DELETE" });
    fetchEndereco();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando endereço...</p>;

  return (
    <div>
      <button
        onClick={onNovo}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md mb-6 font-semibold transition"
      >
        Novo Endereço
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-700 rounded-md">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 text-left">Id Paciente</th>
              <th className="p-3 text-left">CEP</th>
              <th className="p-3 text-left">Rua</th>
              <th className="p-3 text-left">Número</th>
              <th className="p-3 text-left">Bairro</th>
              <th className="p-3 text-left">Endereço</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {enderecos.map((p) => (
              <tr
                key={p.idEndereco}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.idPaciente}</td>
                <td className="p-3">{p.cep}</td>
                <td className="p-3">{p.rua}</td>
                <td className="p-3">{p.numero}</td>
                <td className="p-3">{p.bairro}</td>
                <td className="p-3">{p.estado}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEditar(p)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.idEndereco)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {enderecos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhum endereço encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
