import Image from "next/image";

export default function QuemSomos() {
  const founders = [
    {
      nome: "Hebert Lopes dos Santos",
      rm: "563192",
      turma: "1TDSR",
      img: "/Hebert.png",
      github: "https://github.com/hebertlps",
      linkedin: "https://www.linkedin.com/in/hebert-lopes-36a3bb12a",
      descricao:
        "Hebert traz para a MindDev sua vasta experiência em vendas, combinando conhecimento técnico com habilidades comerciais para ampliar o alcance das soluções desenvolvidas. Seu talento para entender o mercado e criar conexões estratégicas é fundamental para transformar ideias em oportunidades reais.",
    },
    {
      nome: "Marcus Vinícius Vila Nova da Silva",
      rm: "558771",
      turma: "1TDSR",
      img: "/Marcus.jpg",
      github: "https://github.com/marcusvilanova",
      linkedin:
        "https://www.linkedin.com/in/marcus-vin%C3%ADcius-vila-nova-da-silva",
      descricao:
        "Marcus é um líder e gerente de projetos dedicado, que conduz a MindDev com visão clara e foco na entrega de resultados. Sua capacidade de organizar equipes, alinhar objetivos e motivar pessoas garante que cada projeto seja executado com excelência e eficiência.",
    },
    {
      nome: "Nicolas Monteiro Ramiro",
      rm: "562380",
      turma: "1TDSR",
      img: "/Nicolas.jpg",
      github: "https://github.com/Nicolas-Ramiro/",
      linkedin: "https://www.linkedin.com/in/nicolas-ramiro-4a44bb346",
      descricao:
        "Nicolas é o especialista em códigos da MindDev, reconhecido por sua habilidade excepcional em desenvolvimento de software. Ele transforma desafios complexos em soluções digitais robustas e inovadoras, elevando a qualidade técnica dos projetos e garantindo a funcionalidade que o usuário espera.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900 text-white py-20 px-6">
      {/* Título Founders */}
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-16">
        FOUNDERS
      </h2>

      {/* Founders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
        {founders.map((f) => (
          <div
            key={f.nome}
            className="flex flex-col items-center text-center max-w-[350px]"
          >
            <Image
              src={f.img}
              alt={f.nome}
              width={160}
              height={160}
              className="rounded-full object-cover mb-5 shadow-lg w-40 h-40"
            />
            <p className="font-bold text-orange-500">{f.nome}</p>
            <p className="text-justify md:text-lg leading-relaxed mb-3">
              {f.descricao}
            </p>
            <p className="text-md mb-2">
              RM: {f.rm}
              <br />
              {f.turma}
            </p>
            <div className="flex flex-col items-center gap-1">
              <a
                href={f.github}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:underline"
              >
                GitHub
              </a>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pilares */}
      <h2 className="text-3xl font-bold text-center my-16 text-orange-500">
        Nossos Pilares
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Missão */}
        <div className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify">
          <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
            Missão
          </h3>
          <p className="text-sm">
            Transformar a saúde digital, criando soluções tecnológicas
            inovadoras, acessíveis e profundamente humanas, que coloquem o
            paciente no centro da experiência, descomplicando o acesso e a
            navegação no sistema de saúde.
          </p>
        </div>

        {/* Visão */}
        <div className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center text-justify">
          <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
            Visão
          </h3>
          <p className="text-sm">
            Ser a líder global em consultoria tecnológica para a saúde,
            reconhecida pela criação de soluções disruptivas e pela construção
            de uma jornada de cuidados mais eficiente, acessível e humana,
            impactando positivamente milhões de vidas.
          </p>
        </div>

        {/* Valores */}
        <div className="border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-orange-500 font-bold text-xl mb-4 text-center">
            Valores
          </h3>
          <ul className="list-disc list-inside text-sm text-left">
            <li>Inovação com propósito</li>
            <li>Foco em impacto real</li>
            <li>Parceria e escuta ativa</li>
            <li>Excelência com ética</li>
            <li>Diversidade e inclusão</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
