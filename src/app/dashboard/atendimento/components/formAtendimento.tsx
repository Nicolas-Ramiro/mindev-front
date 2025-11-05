"use client";

import { useEffect, useState } from "react";
import { Atendimento } from "../page";

interface FormAtendimentoProps {
  atendimento?: Atendimento | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormAtendimento({ atendimento, onCancel, onSuccess }: FormAtendimentoProps) {
  const [form, setForm] = useState<Atendimento>({
    idPaciente: "",
    idMedico: "",
    data: "",
    especialidade: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (atendimento) setForm(atendimento);
  }, [atendimento]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = atendimento ? "PUT" : "POST";
    const url = atendimento
      ? `http://localhost:8080/mindev/atendimento/${atendimento.idAtendimento}`
      : "http://localhost:8080/mindev/atendimento";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Erro ao salvar atendimento.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {atendimento ? "Editar Atendimento" : "Novo Atendimento"}
      </h2>

      <input
        type="number"
        name="idPaciente"
        placeholder="ID do Paciente"
        value={form.idPaciente}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />

      <input
        type="number"
        name="idMedico"
        placeholder="ID do Médico"
        value={form.idMedico}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />

      <input
        type="date"
        name="data"
        value={form.data}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />

      <input
        type="text"
        name="especialidade"
        placeholder="Especialidade"
        value={form.especialidade}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
      />

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
