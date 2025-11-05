"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Paciente {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  idade: number;
}

interface Medico {
  crm: string;
  nomeMedico: string;
  especialidade: string;
}

export default function ConsultaForm() {
  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [medicoId, setMedicoId] = useState<number | null>(null);
  const [atendimentoId, setAtendimentoId] = useState<number | null>(null);

  const [specialty, setSpecialty] = useState("");
  const [dataConsulta, setDataConsulta] = useState<string>("");
  const [tipoConsulta, setTipoConsulta] = useState<"presencial" | "tele" | "">("presencial");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [sala, setSala] = useState("");
  const [tipoChamada, setTipoChamada] = useState("video");
  const [plataforma, setPlataforma] = useState("whatsapp");
  const [acompanhante, setAcompanhante] = useState(false);

  const { register, handleSubmit, reset } = useForm<Paciente>();
  const { register: registerMedico, handleSubmit: handleMedicoSubmit, reset: resetMedico } = useForm<Medico>();

  // ✅ Cadastrar paciente
  const cadastrarPaciente = async (dados: Paciente) => {
    const response = await fetch("http://localhost:8080/mindev/paciente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const result = await response.json();
    if (result?.idPaciente) {
      setPacienteId(result.idPaciente);
    } else {
      alert("Erro ao cadastrar paciente!");
    }
    reset();
  };

  // ✅ Cadastrar médico
  const cadastrarMedico = async (dados: Medico) => {
    const response = await fetch("http://localhost:8080/mindev/medico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const result = await response.json();
    if (result?.idMedico) {
      setMedicoId(result.idMedico);
    } else {
      alert("Erro ao cadastrar médico!");
    }
    resetMedico();
  };

  // ✅ Cadastrar atendimento
const cadastrarAtendimento = async () => {
  if (!pacienteId) {
    alert("Cadastre o paciente antes de continuar!");
    return;
  }

  if (!medicoId) {
    alert("Cadastre o médico antes de continuar!");
    return;
  }

  if (!dataConsulta || !specialty) {
    alert("Escolha a data e a especialidade antes de continuar!");
    return;
  }

  const atendimento = {
    idPaciente: pacienteId,
    idMedico: medicoId,
    data: dataConsulta,
    especialidade: specialty,
  };

  try {
    const response = await fetch("http://localhost:8080/mindev/atendimento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(atendimento),
    });

    const result = await response.json();

    if (response.ok && result?.idAtendimento) {
      setAtendimentoId(result.idAtendimento);
    } else {
      alert("Erro ao registrar atendimento! Verifique ID do médico e paciente.");
      console.error("Resposta do backend:", result);
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor. Verifique o console.");
    console.error(error);
  }
};



  // ✅ Marcar consulta com base no tipo
  const marcarConsulta = async () => {
  if (!horario || !tipoConsulta) {
    alert("Por favor, selecione o horário e o tipo de consulta.");
    return;
  }

  try {
    const url =
      tipoConsulta === "presencial"
        ? "http://localhost:8080/mindev/presencial"
        : "http://localhost:8080/mindev/teleatendimento";

    const payload =
      tipoConsulta === "presencial"
        ? {
            idPaciente: pacienteId,
            idMedico: medicoId,
            data: dataConsulta,
            especialidade: specialty,
            local,
            sala,
            horario,
            acompanhanteNecessario: acompanhante ? "S" : "N",
          }
        : {
            idPaciente: pacienteId,
            idMedico: medicoId,
            data: dataConsulta,
            especialidade: specialty,
            plataforma,
            horario,
            tipoChamada,
            acompanhanteNecessario: acompanhante ? "S" : "N",
          };

    console.log("Payload enviado:", payload);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setHorario("");
      setTipoConsulta("");
    } else {
      alert("Erro ao registrar consulta. Verifique os dados!");
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro na requisição! Verifique o backend.");
  }
};


  return (
    <div className="flex h-screen bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900">
      {/* Sidebar */}
      <div className="w-1/4 bg-orange-500 text-white flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6">Consultas</h1>

        <button
          onClick={() => document.getElementById("formPaciente")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-white text-orange-500 px-4 py-2 rounded-lg mb-6 font-semibold"
        >
          Cadastrar Paciente
        </button>

        <form
          onSubmit={handleMedicoSubmit(cadastrarMedico)}
          className="flex flex-col gap-3 w-full bg-orange-500 p-4 rounded-lg"
        >
          <h2 className="font-bold text-lg mb-2 text-center">Cadastrar Médico</h2>
          <input {...registerMedico("crm")} placeholder="CRM" className="p-2 border rounded text-black" required />
          <input {...registerMedico("nomeMedico")} placeholder="Nome do Médico" className="p-2 border rounded text-black" required />
          <input {...registerMedico("especialidade")} placeholder="Especialidade" className="p-2 border rounded text-black" required />
          <button type="submit" className="bg-white text-orange-500 py-2 rounded-lg font-semibold">
            Cadastrar Médico
          </button>
        </form>

        <div className="mt-6 w-full text-center">
          <h2 className="font-bold mb-2">Especialidade da Consulta</h2>
          <input
            type="text"
            placeholder="Digite a especialidade"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="text-black p-2 border rounded w-full"
          />
        </div>

        {/* Calendário */}
        <div className="mt-6 w-full text-center">
          <h2 className="font-bold mb-2">Data da Consulta</h2>
          <input
            type="date"
            value={dataConsulta}
            onChange={(e) => setDataConsulta(e.target.value)}
            className="text-black p-2 border rounded w-full"
          />
          <button
            onClick={cadastrarAtendimento}
            className="bg-white text-orange-500 py-2 rounded-lg font-semibold mt-3"
          >
            Cadastrar Atendimento
          </button>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 overflow-auto">
        <img src="/LogoMindev.png" alt="Logo" className="w-32 h-32 mb-4 mt-50" />
        <h1 className="text-3xl font-bold mb-10 text-orange-500">Agendamento de Consultas</h1>

        {/* Formulário de Paciente */}
        <form
          id="formPaciente"
          onSubmit={handleSubmit(cadastrarPaciente)}
          className="bg-gray-200 shadow-lg rounded-xl p-6 w-2/3 flex flex-col gap-3 mb-8"
        >
          <h2 className="text-xl font-semibold text-orange-500 text-center mb-2">Cadastro de Paciente</h2>
          <input {...register("nome")} placeholder="Nome Completo" className="p-2 border rounded text-black" required />
          <input {...register("email")} placeholder="E-mail" className="p-2 border rounded text-black" required />
          <input {...register("cpf")} placeholder="CPF" className="p-2 border rounded text-black" required />
          <input {...register("telefone")} placeholder="Telefone" className="p-2 border rounded text-black" required />
          <input type="number" {...register("idade")} placeholder="Idade" className="p-2 border rounded text-black" required />
          <button type="submit" className="bg-orange-500 text-white py-2 rounded-lg font-semibold">
            Cadastrar Paciente
          </button>
        </form>

        {/* Detalhes da Consulta */}
        <div className="bg-gray-200 shadow-lg rounded-xl p-6 w-2/3 flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-orange-500 text-center mb-2">Detalhes da Consulta</h2>

          <div className="flex gap-4 justify-center text-black">
            <label>
              <input
                type="radio"
                value="presencial"
                checked={tipoConsulta === "presencial"}
                onChange={() => setTipoConsulta("presencial")}
              />
              Presencial
            </label>
            <label>
              <input
                type="radio"
                value="tele"
                checked={tipoConsulta === "tele"}
                onChange={() => setTipoConsulta("tele")}
              />
              Teleatendimento
            </label>
          </div>

          <input
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />

          {/* Campos condicionais */}
          {tipoConsulta === "presencial" ? (
            <>
              <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Local da Consulta"
                className="p-2 border rounded text-black"
              />
              <input
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                placeholder="Sala"
                className="p-2 border rounded text-black"
              />
            </>
          ) : (
            <>
              <select
                value={tipoChamada}
                onChange={(e) => setTipoChamada(e.target.value)}
                className="p-2 border rounded text-black"
              >
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
              </select>
              <select
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                className="p-2 border rounded text-black"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="teams">Teams</option>
                <option value="zoom">Zoom</option>
              </select>
            </>
          )}

          <label className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              checked={acompanhante}
              className="text-black"
              onChange={(e) => setAcompanhante(e.target.checked)}
            />
            Necessita acompanhante
          </label>

          <button
            onClick={marcarConsulta}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Marcar Consulta
          </button>
        </div>
      </div>
    </div>
  );
}
