
"use client";

import { useEffect, useState } from "react";

type Teleatendimento = {
  idTeleatendimento?: number;
  idAtendimento?: number;
  idPaciente: number;
  idMedico: number;
  data: string;
  especialidade: string;
  plataforma: string;
  horario: string;
  tipoChamada: string;
  acompanhanteNecessario: string;
};

interface FormTeleatendimentoProps {
  teleatendimento?: Teleatendimento | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormTeleatendimento({
  teleatendimento,
  onCancel,
  onSuccess,
}: FormTeleatendimentoProps) {
  const [form, setForm] = useState<Teleatendimento>({
    idAtendimento: undefined, // Associado ao atendimento pai
    idPaciente: 0,
    idMedico: 0,
    data: "",
    especialidade: "",
    plataforma: "",
    horario: "",
    tipoChamada: "",
    acompanhanteNecessario: "N",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (teleatendimento) setForm(teleatendimento);
  }, [teleatendimento]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = teleatendimento ? "PUT" : "POST";
    const url = teleatendimento
      ? `http://localhost:8080/mindev/teleatendimento/${teleatendimento.idTeleatendimento}`
      : "http://localhost:8080/mindev/teleatendimento";

    const payload = { ...form };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {teleatendimento ? "Editar Teleatendimento" : "Novo Teleatendimento"}
      </h2>

      <input
        type="number"
        name="idPaciente"
        placeholder="ID do Paciente"
        value={form.idPaciente}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
        required
      />

      <input
        type="number"
        name="idMedico"
        placeholder="ID do Médico"
        value={form.idMedico}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-neutral-700 border border-neutral-600 text-white"
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
        name="plataforma"
        placeholder="Plataforma (ex: Zoom, Google Meet)"
        value={form.plataforma}
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

      <input
        name="tipoChamada"
        placeholder="Tipo de chamada (vídeo, áudio...)"
        value={form.tipoChamada}
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
