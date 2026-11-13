import { useState } from "react";
import { useMediaQuery } from "../lib/motion";
import Hero from "./Hero";
import { Phone, type ScreenId } from "./Phone";
import Services from "./Services";

/*
 * Hero y servicios comparten un celular. En escritorio se queda fijo a la
 * derecha y cambia de pantalla con el paso que cruza el centro de la ventana;
 * en celular cada paso muestra el suyo.
 */
export const Journey = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [screen, setScreen] = useState<ScreenId>("intro");

  return (
    <div data-field className="relative px-gutter md:grid md:grid-cols-12 md:gap-x-8">
      <div className="md:col-span-8">
        <Hero inline={!isDesktop} onEnter={() => setScreen("intro")} />
        <Services active={screen} inline={!isDesktop} onScreen={setScreen} />
      </div>

      {isDesktop && (
        <div className="relative z-30 col-span-4">
          <div className="sticky top-0 flex h-[100svh] items-center justify-end pt-16">
            <Phone screen={screen} className="h-[min(76svh,700px)]" />
          </div>
        </div>
      )}
    </div>
  );
};
