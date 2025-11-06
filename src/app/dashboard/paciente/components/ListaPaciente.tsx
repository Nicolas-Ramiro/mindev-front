"use client";

import { useEffect, useState } from "react";

type Paciente = {
  idPaciente: number;
  nome: string;
  idade: number;
  email: string;
  cpf: number;
  telefone: number;
};

interface ListaPacienteProps {
  onNovo: () => void;
  onEditar: (paciente: Paciente) => void;
}

export default function ListaPaciente({ onNovo, onEditar }: ListaPacienteProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPacientes() {
    try {
      const res = await fetch("https://mindev-java-api.onrender.com/mindev/paciente");
      const data = await res.json();
      setPacientes(data || []);
    } catch (err) {
      console.error("Erro ao carregar pacientes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPacientes();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este paciente?")) return;
    await fetch(`https://mindev-java-api.onrender.com/mindev/paciente/${id}`, { method: "DELETE" });
    fetchPacientes();
  }

  if (loading)
    return <p className="text-center text-neutral-300 mt-10">Carregando pacientes...</p>;

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
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">CPF</th>
              <th className="p-3 text-left">Idade</th>
              <th className="p-3 text-left">Telefone</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr
                key={p.idPaciente}
                className="border-t border-neutral-700 hover:bg-neutral-800 transition"
              >
                <td className="p-3">{p.nome}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.cpf}</td>
                <td className="p-3">{p.idade}</td>
                <td className="p-3">{p.telefone}</td>
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
            {pacientes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-neutral-400">
                  Nenhum paciente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
