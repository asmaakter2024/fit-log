"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import logo from "@/assets/logo.png";
import { WorksContext } from "@/context/WorksContext";

const Navbar = () => {
  const context = useContext(WorksContext);

  if (!context) {
    throw new Error("Navbar must be rendered inside WorksProvider");
  }

  const { addPlan, saveLater, toastMessage } = context;

  return (
    <>
      <header className="navbar min-h-[58px] border-b border-white/10 bg-[#0c0d11] px-5 text-white sm:px-8">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="Fitlog logo"
              className="h-6 w-auto"
              priority
            />
            <span className="text-sm font-black tracking-widest">FITLOG</span>
          </Link>
        </div>

        <nav className="navbar-center">
          <ul className="menu menu-horizontal items-center gap-1 p-0">
            <li>
              <Link
                href="/workouts"
                className="rounded-full bg-lime-400/10 px-4 py-2 text-xs font-semibold text-lime-300"
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/myplan"
                className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                My Plan
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-end gap-4">
          <Link
            href="/myplan#plan"
            className="flex items-center gap-1.5 text-xs text-zinc-300"
          >
            Plan
            <span className="badge badge-sm border-0 bg-lime-400 text-black">
              {addPlan.length}
            </span>
          </Link>

          <Link
            href="/myplan#saved"
            className="flex items-center gap-1.5 text-xs text-zinc-300"
          >
            Saved
            <span className="badge badge-sm border border-white/15 bg-transparent text-zinc-300">
              {saveLater.length}
            </span>
          </Link>
        </div>
      </header>

      {toastMessage && (
        <div className="toast toast-end toast-top z-50">
          <div className="alert border-0 bg-lime-400 text-black shadow-lg">
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
