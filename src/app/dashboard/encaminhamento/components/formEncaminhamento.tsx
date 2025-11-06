"use client";

import { useEffect, useState } from "react";

type Encaminhamento = {
  idEncaminhamento?: number;
  idPaciente: number | string;
  destino: string;
  motivoEncaminhamento: string;
};

interface FormEncaminhamentoProps {
  encaminhamento?: Encaminhamento | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormEncaminhamento({ encaminhamento, onCancel, onSuccess }: FormEncaminhamentoProps) {
  const [form, setForm] = useState<Encaminhamento>({
    idPaciente: "",
    destino: "",
    motivoEncaminhamento: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (encaminhamento) setForm(encaminhamento);
  }, [encaminhamento]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = encaminhamento ? "PUT" : "POST";
    const url = encaminhamento
      ? `http://localhost:8080/mindev/encaminhamento/${encaminhamento.idEncaminhamento}`
      : "http://localhost:8080/mindev/encaminhamento";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  const campos = ["idPaciente", "destino", "motivoEncaminhamento"] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {encaminhamento ? "Editar Encaminhamento" : "Novo Encaminhamento"}
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
