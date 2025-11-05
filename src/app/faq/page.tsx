"use client";

import FaqItem from "... @/app/faq/components/faqItem";

const faqData = [
  {
    question: "Quais serviços a MindDev oferece?",
    answer:
      "A MindDev oferece consultoria em tecnologia para saúde digital, incluindo pesquisas, mapeamento de processos e desenvolvimento de chatbots de voz.",
  },
  {
    question: "Principais diferenciais da MindDev",
    answer:
      "Nossos diferenciais incluem inovação, empatia e soluções acessíveis que promovem inclusão na saúde digital.",
  },
  {
    question: "Como a solução da MindDev promove inclusão digital na saúde?",
    answer:
      "Nossas soluções utilizam tecnologia para tornar a saúde digital acessível a todos, simplificando a jornada do paciente.",
  },
];

export default function FaqPage() {
  return (
    <section className="min-w-screen min-h-[70vh] flex flex-col items-center justify-center px-6 bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-900 text-white">
      <h2 className="text-4xl font-bold text-orange-500 mb-8">FAQ</h2>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {faqData.map((item, idx) => (
          <FaqItem key={idx} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
