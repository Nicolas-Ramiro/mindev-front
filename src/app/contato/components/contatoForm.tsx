"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";

type ContatoFormData = {
  nome: string;
  email: string;
  mensagem: string;
};

const schema = yup
  .object({
    nome: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    mensagem: yup.string().required("A mensagem é obrigatória"),
  })
  .required();

export default function ContatoForm() {
  const [loading, setLoading] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContatoFormData>({
    defaultValues: {
      nome: "",
      email: "",
      mensagem: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submitCallback(values: ContatoFormData) {
    setLoading(true);
    setMensagemErro(null);
    setMensagemSucesso(null);

    try {
      const response = await fetch(
        "https://mindev-java-api.onrender.com/mindev/contato", // URL da sua API Java
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomePacinente: values.nome, // nome do campo conforme o backend
            email: values.email,
            mensagem: values.mensagem,
          }),
        }
      );

      if (response.ok) {
        setMensagemSucesso("Mensagem enviada com sucesso!");
        reset();
      } else {
        const erro = await response.text();
        setMensagemErro("Erro ao enviar mensagem: " + erro);
      }
    } catch (error) {
      setMensagemErro("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-6 mt-10"
      onSubmit={handleSubmit(submitCallback)}
      noValidate
    >
      {/* Nome */}
      <Controller
        name="nome"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome"
              className="p-3 rounded-xl text-black bg-gray-200"
              {...field}
            />
            {errors.nome && (
              <span className="text-red-500 text-sm">
                {errors.nome.message}
              </span>
            )}
          </div>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl text-black bg-gray-200"
              {...field}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        )}
      />

      {/* Mensagem */}
      <Controller
        name="mensagem"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <textarea
              placeholder="Como podemos te ajudar?"
              rows={5}
              className="p-3 rounded-xl text-black bg-gray-200 resize-none"
              {...field}
            />
            {errors.mensagem && (
              <span className="text-red-500 text-sm">
                {errors.mensagem.message}
              </span>
            )}
          </div>
        )}
      />

      {/* Botão */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading || !isValid}
          className="bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 w-32 disabled:opacity-50 transition"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {/* Mensagens de retorno */}
      {mensagemSucesso && (
        <p className="text-green-500 text-center mt-4">{mensagemSucesso}</p>
      )}
      {mensagemErro && (
        <p className="text-red-500 text-center mt-4">{mensagemErro}</p>
      )}
    </form>
  );
}
