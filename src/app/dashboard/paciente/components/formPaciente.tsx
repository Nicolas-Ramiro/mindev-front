"use client";

import { useEffect, useState } from "react";

type Paciente = {
  idPaciente?: number;
  nome: string;
  idade: number | string;
  email: string;
  cpf: number | string;
  telefone: number | string;
};

interface FormPacienteProps {
  paciente?: Paciente | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormPaciente({ paciente, onCancel, onSuccess }: FormPacienteProps) {
  const [form, setForm] = useState<Paciente>({
    nome: "",
    idade: "",
    email: "",
    cpf: "",
    telefone: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (paciente) setForm(paciente);
  }, [paciente]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = paciente ? "PUT" : "POST";
    const url = paciente
      ? `https://mindev-java-api.onrender.com/mindev/paciente/${paciente.idPaciente}`
      : "https://mindev-java-api.onrender.com/mindev/paciente";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  const campos = ["nome", "idade", "email", "cpf", "telefone"] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {paciente ? "Editar Paciente" : "Novo Paciente"}
      </h2>

      {campos.map((campo) => (
        <input
          key={campo}
          name={campo}
          placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
          value={form[campo]?.toString() ?? ""}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      ))}

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 bg-neutral-600 hover:bg-neutral-700 text-white py-2 rounded-md transition font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition font-semibold"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
