"use client";

import { useEffect, useState } from "react";

type Endereco = {
  idEndereco?: number;
  idPaciente: number | string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  estado: string;
};

interface FormEnderecoProps {
  endereco?: Endereco | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FormEnderco({ endereco, onCancel, onSuccess }: FormEnderecoProps) {
  const [form, setForm] = useState<Endereco>({
    idPaciente: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    estado: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (endereco) setForm(endereco);
  }, [endereco]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = endereco ? "PUT" : "POST";
    const url = endereco
      ? `https://mindev-java-api.onrender.com/mindev/endereco/${endereco.idEndereco}`
      : "https://mindev-java-api.onrender.com/mindev/endereco";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  const campos = ["idPaciente", "cep", "rua", "numero", "bairro", "estado"] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {endereco ? "Editar Endereço" : "Novo Endereço"}
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
