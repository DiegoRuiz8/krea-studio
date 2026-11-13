import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  Heart,
  Home,
  Instagram,
  MapPin,
  Menu,
  Mic,
  Search,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";
import { EASE_OUT } from "../lib/motion";

export type ScreenId = "intro" | "sitio" | "tienda" | "chatbot" | "recordatorio" | "resena";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
});

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface Message {
  from: "cliente" | "negocio";
  text: string;
  time: string;
}

interface ChatProps {
  status: string;
  messages: Message[];
  chip?: string;
  channels?: boolean;
}

/* Conversación vista desde el celular del cliente, con la piel de WhatsApp */
const Chat = ({ status, messages, chip, channels = false }: ChatProps) => (
  <div className="ui-whatsapp flex h-full flex-col bg-wa-bg text-wa-ink">
    <div className="flex items-center gap-2.5 bg-wa-bar px-3 pb-2.5 pt-9">
      <ChevronLeft className="h-5 w-5 shrink-0" strokeWidth={2.2} />
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wa-brand text-[13px] font-bold text-wa-bg">
        TN
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold leading-tight">Tu negocio</span>
        <span className="block truncate text-[12px] leading-tight text-wa-soft">{status}</span>
      </span>
      <WhatsAppLogo className="h-5 w-5 shrink-0 text-wa-brand" />
    </div>

    {channels && (
      <motion.div {...rise(0.15)} className="grid grid-cols-2 gap-1.5 bg-wa-bar px-3 pb-3">
        <span className="flex items-center justify-center gap-1.5 rounded-full bg-wa-brand py-1.5 text-[12px] font-semibold text-wa-bg">
          <WhatsAppLogo className="h-3.5 w-3.5" />
          WhatsApp
        </span>
        <span className="flex items-center justify-center gap-1.5 rounded-full bg-wa-in py-1.5 text-[12px] font-semibold">
          <Instagram className="h-3.5 w-3.5" strokeWidth={2.2} />
          Instagram
        </span>
      </motion.div>
    )}

    <ul className="flex flex-1 flex-col justify-end gap-1.5 px-2.5 pb-2.5">
      {messages.map((message, index) => {
        const mine = message.from === "cliente";
        return (
          <motion.li
            key={message.text}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.35 + index * 0.75, ease: EASE_OUT }}
            style={{ transformOrigin: mine ? "100% 100%" : "0% 100%" }}
            className={`max-w-[84%] rounded-xl px-2.5 pb-1.5 pt-2 text-[14px] leading-snug ${
              mine ? "self-end rounded-tr-sm bg-wa-out" : "self-start rounded-tl-sm bg-wa-in"
            }`}
          >
            {message.text}
            <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] leading-none text-wa-soft">
              {message.time}
              {mine && <CheckCheck className="h-3.5 w-3.5 text-wa-tick" strokeWidth={2.4} />}
            </span>
          </motion.li>
        );
      })}
      {chip && (
        <motion.li
          {...rise(0.35 + messages.length * 0.75)}
          className="mt-1.5 flex items-center justify-center gap-1.5 self-center rounded-full bg-wa-brand px-3.5 py-1.5 text-[12px] font-semibold text-wa-bg"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
          {chip}
        </motion.li>
      )}
    </ul>

    <div className="flex items-center gap-2 px-2.5 pb-4">
      <span className="flex-1 rounded-full bg-wa-bar px-4 py-2.5 text-[14px] text-wa-soft">Mensaje</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wa-brand text-wa-bg">
        <Mic className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </span>
    </div>
  </div>
);

/* Captura real del sitio en vertical, a pantalla completa */
const SiteShot = ({ image, title }: { image: string; title: string }) => (
  <motion.img
    src={image}
    alt={title}
    width={1000}
    height={2164}
    initial={{ scale: 1.06 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.4, ease: EASE_OUT }}
    className="h-full w-full object-cover object-top"
  />
);

const featured = {
  name: "Florero Alba",
  price: "$640",
  image: "/shop/florero-margarita.jpg",
};

const products = [
  { name: "Jarrón Luna", price: "$480", image: "/shop/jarron-luna.jpg" },
  { name: "Cuenco Sal", price: "$320", image: "/shop/cuenco-sal.jpg" },
  { name: "Florero Brisa", price: "$540", image: "/shop/florero-brisa.jpg" },
];

const shopTabs = [
  { icon: Home, label: "Inicio", active: true },
  { icon: Search, label: "Buscar", active: false },
  { icon: Heart, label: "Favoritos", active: false },
  { icon: User, label: "Cuenta", active: false },
];

/* Tienda de muestra: todavía no hay una real en el portfolio */
const Shop = () => (
  <div className="ui-shop flex h-full flex-col bg-shop-bg text-shop-ink">
    <p className="bg-shop-ink pb-1.5 pt-8 text-center text-[11px] font-medium text-shop-bg">
      Envío gratis en compras desde $999
    </p>

    <div className="flex items-center justify-between px-4 py-3">
      <Menu className="h-5 w-5" strokeWidth={2} />
      <span className="text-[17px] font-extrabold tracking-[-0.03em]">Tu tienda</span>
      <span className="relative">
        <ShoppingBag className="h-5 w-5" strokeWidth={2} />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 2.4, ease: EASE_OUT }}
          className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-shop-accent text-[10px] font-bold text-shop-bg"
        >
          1
        </motion.span>
      </span>
    </div>

    <div className="min-h-0 flex-1 overflow-hidden px-3">
      <motion.div {...rise(0.2)} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-shop-tile">
        <img
          src={featured.image}
          alt={featured.name}
          width={900}
          height={933}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-shop-bg px-2.5 py-1 text-[11px] font-semibold">
          Nuevo
        </span>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-shop-bg">
          <Heart className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </motion.div>

      <motion.div {...rise(0.35)} className="flex items-start justify-between gap-3 px-1 pt-3">
        <span>
          <span className="block text-[18px] font-bold leading-tight tracking-[-0.02em]">{featured.name}</span>
          <span className="mt-0.5 block text-[12px] text-shop-soft">Cerámica hecha a mano</span>
        </span>
        <span className="tabular text-[18px] font-bold leading-tight">{featured.price}</span>
      </motion.div>

      <div className="relative mt-3">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1, 0.95, 1] }}
          transition={{ duration: 1.9, delay: 0.6, ease: EASE_OUT }}
          className="flex items-center justify-center rounded-full bg-shop-ink py-2.5 text-[14px] font-semibold text-shop-bg"
        >
          Agregar al carrito
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.4 }}
          className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-shop-accent text-[14px] font-semibold text-shop-bg"
        >
          <Check className="h-4 w-4" strokeWidth={3} />
          Agregado
        </motion.span>
      </div>

      <motion.p {...rise(0.55)} className="px-1 pb-2 pt-4 text-[14px] font-bold tracking-[-0.01em]">
        Más vendidos
      </motion.p>
      <div className="-mr-3 flex gap-2.5">
        {products.map((product, index) => (
          <motion.div key={product.name} {...rise(0.65 + index * 0.08)} className="w-[44%] shrink-0">
            <img
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square w-full rounded-xl bg-shop-tile object-cover"
            />
            <p className="px-0.5 pt-1.5 text-[12px] font-medium leading-tight">{product.name}</p>
            <p className="tabular px-0.5 text-[12px] text-shop-soft">{product.price}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-4 bg-shop-bg px-2 pb-5 pt-2.5">
      {shopTabs.map(({ icon: Icon, label, active }) => (
        <span
          key={label}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
            active ? "text-shop-ink" : "text-shop-soft"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
          {label}
        </span>
      ))}
    </div>
  </div>
);

const Stars = ({ delay = 0 }: { delay?: number }) => (
  <span className="flex gap-0.5 text-rv-star">
    {[0, 1, 2, 3, 4].map((star) => (
      <motion.span
        key={star}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: delay + star * 0.09, ease: EASE_OUT }}
      >
        <Star className="h-4 w-4 fill-current" strokeWidth={0} />
      </motion.span>
    ))}
  </span>
);

/* Ficha del negocio en un mapa, con una reseña y la respuesta del propietario */
const Review = () => (
  <div className="ui-review flex h-full flex-col bg-rv-bg px-4 pb-5 pt-10 text-rv-ink">
    <motion.div {...rise(0.15)}>
      <p className="text-[21px] font-semibold leading-tight tracking-[-0.01em]">Tu negocio</p>
      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-rv-soft">
        <span className="font-semibold text-rv-ink">4.9</span>
        <Stars />
        (128)
      </p>
      <p className="mt-1 flex items-center gap-1 text-[13px] text-rv-soft">
        <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} />
        Guadalajara, Jal. · Abierto
      </p>
    </motion.div>

    <motion.div {...rise(0.3)} className="mt-4 grid grid-cols-3 text-center text-[13px] font-medium text-rv-soft">
      <span className="pb-2">Resumen</span>
      <span className="border-b-2 border-rv-link pb-2 text-rv-link">Reseñas</span>
      <span className="pb-2">Fotos</span>
    </motion.div>

    <div className="flex flex-1 flex-col justify-center">
      <motion.div {...rise(0.5)}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-avatar text-[15px] font-medium text-rv-bg">
            M
          </span>
          <span>
            <span className="block text-[14px] font-medium leading-tight">Mariana G.</span>
            <span className="block text-[12px] leading-tight text-rv-soft">Local Guide · 12 reseñas</span>
          </span>
        </div>
        <p className="mt-2.5 flex items-center gap-2 text-[12px] text-rv-soft">
          <Stars delay={0.7} />
          hace 2 horas
        </p>
        <p className="mt-2 text-[14px] leading-snug">
          Me contestaron al instante y me recordaron mi cita un día antes. Muy recomendable.
        </p>
      </motion.div>

      <motion.div {...rise(1.6)} className="mt-4 rounded-xl bg-rv-reply p-3.5">
        <p className="text-[13px] font-medium">
          Tu negocio (propietario)
          <span className="ml-1.5 font-normal text-rv-soft">hace 1 hora</span>
        </p>
        <p className="mt-1.5 text-[14px] leading-snug">
          ¡Gracias, Mariana! Nos da gusto que la atención fue rápida. Aquí te esperamos.
        </p>
      </motion.div>
    </div>
  </div>
);

const Screen = ({ id }: { id: ScreenId }) => {
  switch (id) {
    case "intro":
      return (
        <Chat
          status="en línea"
          messages={[
            { from: "cliente", text: "Hola, vi su sitio. ¿Tienen cita para el viernes?", time: "10:14" },
            { from: "negocio", text: "¡Hola! Sí, tengo 5:00 pm o 6:30 pm. ¿Cuál te queda mejor?", time: "10:14" },
            { from: "cliente", text: "5:00 pm", time: "10:15" },
          ]}
          chip="Cita confirmada · vie 5:00 pm"
        />
      );
    case "sitio":
      return <SiteShot image="/projects/luisfelipeiv-mobile.jpg" title="Luis Felipe IV" />;
    case "tienda":
      return <Shop />;
    case "chatbot":
      return (
        <Chat
          channels
          status="responde al instante"
          messages={[
            { from: "cliente", text: "¿Abren los sábados?", time: "23:42" },
            { from: "negocio", text: "Sí, de 9 a 2. ¿Quieres que te aparte un lugar?", time: "23:42" },
            { from: "cliente", text: "Sí, por favor", time: "23:43" },
            { from: "negocio", text: "Listo. ¿A qué hora te queda mejor?", time: "23:43" },
          ]}
        />
      );
    case "recordatorio":
      return (
        <Chat
          status="en línea"
          messages={[
            {
              from: "negocio",
              text: "Hola Mariana, te recordamos tu cita mañana a las 5:00 pm. ¿Confirmas?",
              time: "9:00",
            },
            { from: "cliente", text: "Confirmo, gracias", time: "9:06" },
            { from: "negocio", text: "Perfecto, aquí te esperamos.", time: "9:06" },
          ]}
          chip="Cita confirmada"
        />
      );
    case "resena":
      return <Review />;
  }
};

interface PhoneProps {
  screen: ScreenId | null;
  className?: string;
}

/* El celular donde se ve el trabajo: el sitio, la tienda, el chat, la reseña */
export const Phone = ({ screen, className = "" }: PhoneProps) => (
  <div
    data-ui
    aria-hidden="true"
    className={`field-ground aspect-[9/19] rounded-[44px] bg-surface-raised p-[10px] ${className}`}
  >
    <div className="relative h-full overflow-hidden rounded-[34px] bg-ground">
      <AnimatePresence mode="wait">
        {screen && (
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <Screen id={screen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
