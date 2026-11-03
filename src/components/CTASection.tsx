import { SplitWords, Reveal } from "./Reveal";

const CALL_HREF =
  "mailto:hola@studioskrea.com?subject=Agendar%20llamada%20gratuita";

/* El monolito vuelve a armarse en [data-anchor="cta"] */
const CTASection = () => (
  <section
    id="contacto"
    data-scene="cta"
    className="relative z-10 grid min-h-[100svh] content-center gap-10 px-gutter py-32 md:grid-cols-12 md:gap-x-8 md:gap-y-4"
  >
    <SplitWords
      text={"Tu sitio o tu WhatsApp\nestán perdiendo clientes."}
      className="text-[clamp(38px,5.6vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:col-span-12 md:font-wide"
    />

    <Reveal delay={0.25} className="self-end md:col-span-6">
      <p className="max-w-[44ch] text-lg leading-relaxed text-ink md:text-xl">
        Llamada de 20 min. Sin costo. Te decimos exactamente qué está
        fallando y cómo lo arreglamos.
      </p>
      <a
        href={CALL_HREF}
        className="group mt-8 inline-flex items-center gap-3 bg-accent px-7 py-5 text-base font-semibold text-on-accent transition-transform duration-200 ease-out active:scale-[0.97] md:text-lg"
      >
        Agendar llamada gratuita
        <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </a>
    </Reveal>

    <div
      data-anchor="cta"
      aria-hidden="true"
      className="order-first h-[30svh] md:order-none md:col-span-6 md:h-[44svh]"
    />
  </section>
);

export default CTASection;
