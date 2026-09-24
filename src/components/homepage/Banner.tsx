import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="mx-4 mt-8 rounded-xl border border-white/[.06] bg-[#14151b] px-5 py-8 text-white sm:px-8 md:px-10">
      <div className="mx-auto grid min-h-[330px] w-full max-w-[1050px] grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_340px] md:gap-10">
        <div className="max-w-[540px]">
          <h5 className="mb-5 text-[9px] font-bold uppercase tracking-[0.18em] text-lime-400">
            Workout Library
          </h5>

          <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Train with intent.
            <br />
            Log every set.
          </h2>

          <p className="mt-4 max-w-[460px] text-xs leading-5 text-zinc-400 sm:text-sm">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-5 inline-flex rounded-md bg-lime-400 px-4 py-2.5 text-[9px] font-bold uppercase tracking-wide text-black transition hover:bg-lime-300"
          >
            Browse workouts
          </a>
        </div>

        <div className="relative mx-auto h-[270px] w-full max-w-[320px] md:h-[310px]">
          <Image
            src={banner}
            alt="Athlete training at the gym"
            fill
            priority
            sizes="(max-width: 768px) 320px, 340px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
