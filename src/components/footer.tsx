import Image from "next/image";

export default function Footer() {
  const pessoas = [
    {
      nome: "Hebert",
      url: "https://www.linkedin.com/in/hebert-lopes-36a3bb12a",
    },
    {
      nome: "Marcus",
      url: "https://www.linkedin.com/in/marcus-vin%C3%ADcius-vila-nova-da-silva",
    },
    {
      nome: "Nicolas",
      url: "https://www.linkedin.com/in/nicolas-ramiro-4a44bb346",
    },
  ];

  return (
    <footer className="bg-neutral-800 text-white px-6 sm:px-10 lg:px-20 py-8 sm:py-10 w-full">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center lg:items-start gap-8 sm:gap-10 text-center lg:text-left">
        {/* Logo */}
        <div className="flex-1 min-w-[200px] flex flex-col items-center lg:items-start">
          <Image
            src="/LogoMindev.png"
            alt="Logo Mindev"
            width={80}
            height={80}
            className="mb-4"
          />
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xs">
            Inovando na saúde digital com tecnologia acessível.
          </p>
        </div>

        {/* Contato */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-orange-500 font-semibold text-base sm:text-lg mb-3">
            Contato
          </h3>
          <a
            href="mailto:Mindev@gmail.com"
            className="block text-xs sm:text-sm md:text-base text-white hover:underline"
          >
            Mindev@gmail.com
          </a>
        </div>

        {/* Redes Sociais */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-orange-500 font-semibold text-base sm:text-lg mb-3">
            Redes Sociais
          </h3>
          <div className="space-y-3">
            {pessoas.map((pessoa) => (
              <div
                key={pessoa.nome}
                className="flex justify-center lg:justify-start items-center gap-2"
              >
                <Image
                  src="/linkedinLogo.webp"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
                <a
                  href={pessoa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm md:text-base hover:underline"
                >
                  {pessoa.nome}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 sm:mt-10 pt-4 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} Mindev. Todos os direitos reservados.
      </div>
    </footer>
  );
}
