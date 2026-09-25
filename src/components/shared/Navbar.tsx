import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <header className="navbar min-h-[58px] border-b border-white/10 bg-[#0c0d11] px-5 text-white sm:px-8">
      {/* Left: logo and brand */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo} alt="Fitlog logo" className="h-6 w-auto" priority />
          <span className="text-sm font-black tracking-widest">FITLOG</span>
        </Link>
      </div>

      {/* Center: navigation */}
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

      {/* Right: plan and saved counts */}
      <div className="navbar-end gap-4">
        <Link
          href="/my-plan#plan"
          className="flex items-center gap-1.5 text-xs text-zinc-300"
        >
          Plan
          <span className="badge badge-sm border-0 bg-lime-400 text-black">
            0
          </span>
        </Link>

        <Link
          href="/my-plan#saved"
          className="flex items-center gap-1.5 text-xs text-zinc-300"
        >
          Saved
          <span className="badge badge-sm border border-white/15 bg-transparent text-zinc-300">
            0
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
