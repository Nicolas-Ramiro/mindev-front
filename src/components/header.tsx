"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import path from "path";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "FAQ", path: "/faq" },
    { name: "Proposta", path: "/proposta" },
    { name: "Contato", path: "/contato" },
    { name: "Consulta", path: "/consulta" },
    { name: "Login", path: "/login"},
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-800 flex items-center justify-center z-20 shadow-md">
      <div className="flex flex-col items-center justify-center py-4 md:flex-row md:justify-between md:h-[120px] md:px-10 w-full max-w-7xl">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/LogoMindev.png"
            alt="Logo Mindev"
            width={80}
            height={80}
            className="cursor-pointer mb-3 md:mb-0"
          />
        </Link>

        {/* Menu hamburguer (mobile) */}
        <button
          className="md:hidden flex items-center justify-center text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Links desktop */}
        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-lg md:text-xl text-white hover:text-orange-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar (mobile) */}
      <nav
        className={`fixed top-0 left-0 h-full w-2/3 bg-neutral-900 shadow-lg transform transition-transform duration-300 z-30 md:hidden flex flex-col items-center pt-24 gap-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            onClick={() => setIsOpen(false)}
            className="text-lg text-white hover:text-orange-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
