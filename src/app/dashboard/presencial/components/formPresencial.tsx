"use client";

import { useEffect, useState } from "react";

type AtendimentoPresencial = {
  idAtendimentoPre?: number;
  idAtendimento?: number;
  idPaciente: number;
  idMedico: number;
  data: string;
  especialidade: string;
  local: string;
  sala: string;
  horario: string;
  acompanhanteNecessario: string;
};

interface FormPresencialProps {
  presencial?: AtendimentoPresencial | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormPresencial({
  presencial,
  onCancel,
  onSuccess,
}: FormPresencialProps) {
  const [form, setForm] = useState<AtendimentoPresencial>({
    idPaciente: 0,
    idMedico: 0,
    data: "",
    especialidade: "",
    local: "",
    sala: "",
    horario: "",
    acompanhanteNecessario: "N",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (presencial) setForm(presencial);
  }, [presencial]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = presencial ? "PUT" : "POST";
    const url = presencial
      ? `http://localhost:8080/mindev/presencial/${presencial.idAtendimentoPre}`
      : "http://localhost:8080/mindev/presencial";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {presencial ? "Editar Atendimento Presencial" : "Novo Atendimento Presencial"}
      </h2>

      <input
        name="idPaciente"
        placeholder="ID do Paciente"
        value={form.idPaciente}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        required
      />

      <input
        name="idMedico"
        placeholder="ID do Médico"
        value={form.idMedico}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        required
      />

      <input
        type="date"
        name="data"
        value={form.data}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <input
        name="especialidade"
        placeholder="Especialidade"
        value={form.especialidade}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <input
        name="local"
        placeholder="Local"
        value={form.local}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <input
        name="sala"
        placeholder="Sala"
        value={form.sala}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <input
        type="time"
        name="horario"
        value={form.horario}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <select
        name="acompanhanteNecessario"
        value={form.acompanhanteNecessario}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
      >
        <option value="N">Acompanhante não necessário</option>
        <option value="S">Acompanhante necessário</option>
      </select>

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
