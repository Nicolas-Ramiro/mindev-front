Mindev - Sistema de Gestão de Atendimentos Clínicos

Professor eu começei a fazer o projeto durante suas aulas e não percebi que era para fazer em React e Next, perguntei para você se podia enviar em Next e você pediu para deixar comentado aqui no README para te lembrar

🎯 Objetivo do Projeto

O projeto Mindev tem como objetivo principal desenvolver um sistema de cadastro e gestão de atendimentos clínicos. A solução proposta oferece suporte completo para a administração de atendimentos presenciais e teleatendimentos, além da gestão de pacientes, acompanhantes, médicos, terapias, encaminhamentos e endereços.

💻 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

Framework: Next.js 
Estilização: Tailwind CSS 
Hospedagem: Vercel 
Controle de Versão: GitHub 
Ambiente de Desenvolvimento: Visual Studio Code 

🔗 Acesso ao Projeto

Aplicação Funcional (URL): https://mindev-front.vercel.app/
Repositório GitHub: https://github.com/Nicolas-Ramiro/mindev-front
Vídeo de Apresentação (YouTube): https://youtu.be/UwTlwjf-dyg?si=cO7P-O2Q5wOq0gHa 

👥 Integrantes do Grupo

Nicolas Monteiro Ramiro              RM: 562380
Hebert Lopes dos Santos              RM: 563192
Marcus Vinícius Vila Nova da Silva   RM: 558771

📂 Estrutura de Pastas do Projeto

A estrutura de pastas segue a convenção do Next.js App Router, organizada para facilitar a manutenção e o desenvolvimento:

mindev-front-master/
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── Hebert.png
│   ├── LogoMindev.png
│   ├── Marcus.jpg
│   ├── Nicolas.jpg
│   ├── file.svg
│   ├── globe.svg
│   ├── linkedinLogo.webp
│   ├── next.svg
│   ├── paisagem.jpg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── consulta/
│   │   │   ├── components/
│   │   │   │   └── consultaForm.tsx
│   │   │   └── page.tsx
│   │   ├── contato/
│   │   │   ├── components/
│   │   │   │   └── contatoForm.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── acompanhante/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formAcompanhante.tsx
│   │   │   │   │   └── listaAcompanhante.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── atendimento/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formAtendimento.tsx
│   │   │   │   │   └── listaAtendimento.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── encaminhamento/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formEncaminhamento.tsx
│   │   │   │   │   └── listaEncaminhamento.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── endereco/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formEndereco.tsx
│   │   │   │   │   └── listaEndereco.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── medico/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formMedico.tsx
│   │   │   │   │   └── listaMedico.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── paciente/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ListaPaciente.tsx
│   │   │   │   │   └── formPaciente.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── presencial/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formPresencial.tsx
│   │   │   │   │   └── listaPresencial.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── teleatendimento/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formTeleatendimento.tsx
│   │   │   │   │   └── listaTeleatendimento.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── terapia/
│   │   │   │   ├── components/
│   │   │   │   │   ├── formTerapia.tsx
│   │   │   │   │   └── listaTerapia.tsx
│   │   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   ├── components/
│   │   │   │   └── faqItem.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   ├── (components)/
│   │   │   │   └── login-form/
│   │   │   │       └── login-form.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── proposta/
│   │   │   └── page.tsx
│   │   └── quem-somos/
│   │       └── page.tsx
│   └── components/
│       ├── botaoDashboard.tsx
│       ├── footer.tsx
│       └── header.tsx
└── tsconfig.json
