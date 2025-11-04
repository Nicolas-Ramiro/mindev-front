// app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900 text-white min-h-[80vh] px-6 sm:px-10 lg:px-20 py-16">
      {/* Texto lado esquerdo */}
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
          Mindev
        </h1>
        <h2 className="text-xl md:text-2xl mb-4">
          Inovação e Empatia para Transformar a Saúde Digital
        </h2>
        <p className="text-justify md:text-lg leading-relaxed text-gray-200">
          A MindDev é uma empresa de tecnologia especializada em saúde digital
          que acredita no poder da inovação para criar soluções acessíveis e
          eficientes. Nossa missão é simplificar a jornada do paciente e
          promover a inclusão, utilizando a tecnologia para tornar a saúde
          digital acessível a todos.
          <br />
          <br />
          Atuamos em todas as etapas, desde a pesquisa e mapeamento de processos
          até o desenvolvimento de ferramentas como chatbots de voz. Unimos
          tecnologia e empatia para transformar a vida das pessoas, garantindo
          que o cuidado e a assistência cheguem a quem mais precisa.
        </p>
      </div>

      {/* Imagem lado direito */}
      <div className="md:w-1/2 flex justify-center">
        <Image
          src="/paisagem.jpg"
          alt="Prédio empresarial"
          width={500}
          height={400}
          className="rounded-lg shadow-lg w-full md:w-[90%] max-w-[500px]"
        />
      </div>
    </main>
  );
}
