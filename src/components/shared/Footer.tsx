import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-[#08090c]">
      <div className="container mx-auto flex min-h-16 flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row">
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-[#CCFF00]"
          >
            <path d="M3 8h2V6h3v12H5v-2H3V8Zm18 0h-2V6h-3v12h3v-2h2V8ZM9 10h6v4H9v-4Z" />
          </svg>
          <span>FITLOG</span>
        </Link>

        <p className="text-center text-[11px] text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
