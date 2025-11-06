"use client";

import { useEffect, useState } from "react";

type Acompanhante = {
  idAcompanhante?: number;
  idPaciente: number | string;
  nomeAcompanhante: string;
  parentesco: string;
};

interface FormAcompanhanteProps {
  acompanhante?: Acompanhante | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormAcompanhante({ acompanhante, onCancel, onSuccess }: FormAcompanhanteProps) {
  const [form, setForm] = useState<Acompanhante>({
    idPaciente: "",
    nomeAcompanhante: "",
    parentesco: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (acompanhante) setForm(acompanhante);
  }, [acompanhante]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = acompanhante ? "PUT" : "POST";
    const url = acompanhante
      ? `http://localhost:8080/mindev/acompanhante/${acompanhante.idAcompanhante}`
      : "http://localhost:8080/mindev/acompanhante";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  const campos = ["idPaciente", "nomeAcompanhante", "parentesco"] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {acompanhante ? "Editar Acompanhante" : "Novo Acompanhante"}
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
