"use client";

import { useState } from "react";
import ListaTeleatendimento from "... @/app/dashboard/teleatendimento/components/listaTeleatendimento";
import FormTeleatendimento from "... @/app/dashboard/teleatendimento/components/formTeleatendimento";
import BotaoDashboard from "... @/components/botaoDashboard";

export default function TeleatendimentoPage() {
    const [modo, setModo] = useState<"lista" | "form">("lista");
    const [teleEdit, setTeleEdit] = useState<Teleatendimento | null>(null);

    return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Teleatendimentos</h1>
        {modo === "lista" ? (
            <ListaTeleatendimento
            onNovo={() => setModo("form")}
            onEditar={(tele) => {
                setTeleEdit(tele);
                setModo("form");
            }}
            />
        ) : (
        <FormTeleatendimento
        teleatendimento={teleEdit}
        onCancel={() => {
            setTeleEdit(null);
            setModo("lista");
        }}
        onSuccess={() => {
            setTeleEdit(null);
            setModo("lista");
        }}
        />
        )}
        <div className="flex justify-between items-center mb-6 mt-6">
            <BotaoDashboard/>
        </div>
    </div>
    );
}
export interface Teleatendimento {
    idTeleatendimento?: number;
    idAtendimento?: number;
    idPaciente: number;
    idMedico: number;
    data: string;
    especialidade: string;
    plataforma: string;
    horario: string;
    tipoChamada: string;
    acompanhanteNecessario: "S" | "N";
}
