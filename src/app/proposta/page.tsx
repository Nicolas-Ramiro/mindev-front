export default function PropostaPage() {
  return (
    <main className="min-h-[70vh] min-w-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white pt-32 pb-20 px-6">
      <div className="w-full flex flex-col gap-10 items-center">
        
        {/* Card principal - Proposta */}
        <section className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify w-full max-w-[500px]">
          <h3 className="text-orange-500 font-bold text-2xl mb-4 text-center">
            Proposta
          </h3>
          <p className="text-base leading-relaxed">
            A solução da <strong>MindDev</strong> foi desenvolvida para enfrentar as barreiras
            tecnológicas que dificultam o acesso à saúde digital, especialmente
            para pacientes com deficiência física ou com dificuldades no uso de
            dispositivos móveis. O sistema foca em uma jornada do paciente mais
            fluida, que integra ferramentas para agendamento e comunicação, com
            o objetivo de reduzir a taxa de absenteísmo nas teleconsultas.
          </p>
        </section>

        {/* Grid Responsivo com os blocos de conteúdo */}
        <div className="flex flex-col gap-10 w-full items-center lg:grid lg:grid-cols-2 lg:gap-10 lg:max-w-6xl xl:flex xl:flex-row xl:justify-center xl:max-w-none">
          
          {/* Chatbot Assistido por Voz */}
          <section className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify w-full max-w-[500px]">
            <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
              Chatbot Assistido por Voz
            </h3>
            <p className="text-base leading-relaxed">
              O chatbot, desenvolvido na plataforma <strong>Watson Assistant</strong>, utiliza
              inteligência artificial para interpretar as intenções dos usuários
              e responder de forma precisa e personalizada.  
              A tecnologia de reconhecimento de fala (<strong>Speech-to-Text</strong>) transforma
              a fala dos pacientes em texto, permitindo que o chatbot entenda
              comandos e solicitações.  
              Já a tecnologia <strong>Text-to-Speech</strong> converte a resposta
              do chatbot em áudio, tornando a informação acessível a todos.
            </p>
          </section>

          {/* Funcionalidades do Chatbot */}
          <section className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify w-full max-w-[500px]">
            <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
              Funcionalidades do Chatbot
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Confirmação de Consultas:</strong> O chatbot pode
                confirmar agendamentos de forma rápida e simples, usando apenas
                a voz.
              </li>
              <li>
                <strong>Reagendamento de Consultas:</strong> O paciente pode
                alterar o horário de forma ágil, sem necessidade de intervenção
                humana.
              </li>
              <li>
                <strong>Obtenção de Informações:</strong> O sistema fornece
                informações sobre serviços e procedimentos de forma direta e por
                voz.
              </li>
              <li>
                <strong>Memorização de Contexto:</strong> O sistema lembra
                informações das conversas para oferecer um atendimento
                personalizado e contínuo, com base no histórico de interações.
              </li>
            </ul>
          </section>

          {/* Plataforma de Agendamento */}
          <section className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify w-full max-w-[500px]">
            <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
              Plataforma de Agendamento
            </h3>
            <p className="text-base leading-relaxed">
              Além do chatbot, a <strong>MindDev</strong> propõe a criação de uma tela de
              agendamento de consultas para ser integrada aos sistemas já
              utilizados internamente.  
              Essa plataforma permite que pacientes ou acompanhantes agendem e
              consultem informações de seus atendimentos, além de gerar um banco
              de dados que facilita o controle administrativo e a organização
              das atividades da equipe.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
