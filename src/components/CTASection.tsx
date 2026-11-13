import { SplitWords, Reveal } from "./Reveal";

const CALL_HREF =
  "mailto:hola@studioskrea.com?subject=Agendar%20llamada%20gratuita";

/* Los bloques del fondo arman la K en [data-dots="k"] */
const CTASection = () => (
  <section
    id="contacto"
    data-field
    className="relative grid content-center gap-8 px-gutter py-20 md:min-h-[100svh] md:gap-10 md:py-32 md:grid-cols-12 md:gap-x-8 md:gap-y-4"
  >
    <SplitWords
      text={"Tu sitio o tu WhatsApp\nestán perdiendo clientes."}
      className="text-[clamp(38px,5.6vw,104px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink relative z-10 md:col-span-12 md:font-wide"
    />

    <Reveal delay={0.25} className="relative z-10 self-end md:col-span-6">
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
      data-dots="k"
      aria-hidden="true"
      className="order-first h-[30svh] md:order-none md:col-span-6 md:h-[44svh]"
    />
  </section>
);

export default CTASection;
