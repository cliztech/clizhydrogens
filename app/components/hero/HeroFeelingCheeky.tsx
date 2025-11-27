// app/components/hero/HeroFeelingCheeky.tsx
import heroMascot from '/images/hero-feeling-cheeky.png';

export function HeroFeelingCheeky() {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-24">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: 'var(--cp-hero-glow)',
        }}
      />
      <div className="relative z-10 space-y-6">
        <p className="uppercase text-sm font-bold tracking-widest text-cp-primary">
          Cheeky Prints
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-cp-foreground">
          FEELING CHEEKY?
        </h1>
        <p className="text-lg text-cp-foreground-soft max-w-md">
          Neon anime merch for the bold, the playful, and the cozy.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">Shop Now</button>
          <button className="btn-ghost">New Drops</button>
        </div>
      </div>
      <div className="relative z-10">
        <img
          src={heroMascot}
          alt="Cheeky Prints mascot hero"
          className="w-full h-auto rounded-3xl shadow-cp-xl border border-cp-surface-soft object-cover"
        />
      </div>
    </section>
  );
}