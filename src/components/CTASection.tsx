import { Reveal, SplitWords } from "./Reveal";

const CALL_HREF =
  "mailto:hola@studioskrea.com?subject=Agendar%20llamada%20gratuita";

/* La pila vuelve a cerrarse en [data-anchor="cta"], ya con la interfaz en lima */
const CTASection = () => (
  <section
    id="contacto"
    data-scene="cta"
    className="relative z-10 grid min-h-[100svh] content-center gap-8 px-gutter py-28 md:grid-cols-axis md:gap-0"
  >
    <div className="md:pr-10">
      <div data-anchor="cta" aria-hidden="true" className="h-[30svh] md:h-[60svh]" />
    </div>

    <div className="self-center">
      <SplitWords
        text={"Tu sitio o tu WhatsApp\nestán perdiendo clientes."}
        className="font-serif text-[clamp(40px,4.6vw,88px)] leading-[0.95] tracking-[-0.02em] text-ink"
      />
      <Reveal delay={0.25}>
        <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-ink md:text-[22px] md:leading-snug">
          Llamada de 20 min. Sin costo. Te decimos exactamente qué está
          fallando y cómo lo arreglamos.
        </p>
        <a
          href={CALL_HREF}
          className="group mt-10 inline-flex items-center gap-3 bg-accent px-7 py-5 text-base font-semibold text-on-accent transition-[transform,background-color,color] duration-200 ease-out hover:bg-ink hover:text-ground active:scale-[0.97] md:text-lg"
        >
          Agendar llamada gratuita
          <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            →
          </span>
        </a>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
