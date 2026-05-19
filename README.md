# 🎨 Krea Studio - Web Development Agency

Sitio web moderno de agencia de desarrollo con animaciones profesionales de scroll, diseño minimalista y código production-ready.

## 🚀 Características

- ✅ **React 18 + TypeScript** - Código type-safe y mantenible
- ✅ **Framer Motion** - Animaciones fluidas y profesionales
- ✅ **Tailwind CSS** - Sistema de diseño custom con paleta única
- ✅ **Vite** - Build rápido y HMR instantáneo
- ✅ **Lucide Icons** - Iconos SVG optimizados
- ✅ **Responsive Design** - Mobile-first, optimizado para todos los dispositivos
- ✅ **Accesibilidad** - Semántica HTML y navegación por teclado

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Negro principal:** `#0A0A0A` (fondo base)
- **Negro secundario:** `#141414` (cards, navegación)
- **Blanco:** `#FFFFFF` (texto primario)
- **Gris:** `#A0A0A0` (texto secundario)
- **Amarillo verdoso (acento):** `#BFFF0B`
- **Hover acento:** `#D4FF3D`

### Tipografía
- **Headlines:** Space Grotesk (bold, tight tracking)
- **Body:** Inter (regular, legible)
- **Labels:** Inter (uppercase, small caps)

### Fondos Dinámicos
- Grid pattern con líneas `#BFFF0B` (opacity: 0.03)
- Radial gradient amarillo verdoso desde el centro (opacity: 0.08)
- Ambos fondos superpuestos para profundidad visual

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**
```bash
cd krea-studio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Linter
npm run lint
```

## 📂 Estructura del Proyecto

```
krea-studio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Navegación sticky con backdrop blur
│   │   ├── Hero.tsx         # Hero section con animaciones
│   │   ├── Services.tsx     # Grid de servicios con stagger
│   │   ├── Process.tsx      # Timeline numerado 01-04
│   │   ├── Portfolio.tsx    # Grid de proyectos con hover
│   │   ├── Stats.tsx        # Estadísticas con count-up
│   │   ├── CTASection.tsx   # Call-to-action con glow
│   │   └── Footer.tsx       # Footer con links y redes
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales + fondos
├── index.html
├── package.json
├── tailwind.config.js       # Configuración Tailwind custom
├── tsconfig.json
└── vite.config.ts
```

## 🎬 Animaciones Implementadas

### Scroll Animations
- **Fade in + Slide up** - Elementos aparecen al hacer scroll
- **Stagger effect** - Cards de servicios aparecen secuencialmente (delay 0.15s)
- **Count-up numbers** - Animación de números en estadísticas
- **Parallax sutil** - Imágenes de portfolio con efecto parallax

### Hover Effects
- **Glow amarillo verdoso** - Botones y elementos interactivos
- **Border glow** - Cards de portfolio
- **Scale transform** - Botones y enlaces

### Navbar
- **Slide down** - Aparece desde arriba al cargar
- **Backdrop blur** - Efecto glassmorphism al hacer scroll
- **Border transition** - Aparece al hacer scroll

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### Build manual
```bash
npm run build
# Los archivos estarán en dist/
```

## 🎯 Secciones del Sitio

1. **Hero** - "Creamos experiencias web que convierten" + CTAs
2. **Servicios** - Grid 3 columnas (Diseño, Desarrollo, E-commerce)
3. **Proceso** - Timeline 4 pasos: Estrategia → Diseño → Desarrollo → Lanzamiento
4. **Portfolio** - Grid 2x2 proyectos con hover overlays
5. **Stats** - 50+ proyectos, 98% satisfacción, 2x conversión (count-up)
6. **CTA** - Card con glow effect amarillo verdoso
7. **Footer** - Links, redes, contacto

## 🔧 Personalización

### Cambiar colores
Edita `tailwind.config.js`:
```js
colors: {
  'accent': '#BFFF0B', // Tu color de acento
  // ...
}
```

### Modificar animaciones
Edita las configuraciones de Framer Motion en cada componente:
```tsx
transition={{ duration: 0.6, delay: 0.2 }}
```

### Cambiar tipografías
Edita `tailwind.config.js` y las importaciones en `index.css`

## 📱 Responsive

- **Mobile:** < 768px (1 columna, márgenes reducidos)
- **Tablet:** 768px - 1024px (2 columnas adaptativo)
- **Desktop:** > 1024px (Layout completo, máximo 1440px)

## 🎨 Referencias de Diseño

- [Pomelo](https://pomelo.la/en) - Animaciones scroll
- [Studio Apply](https://www.studioapply.com) - Paleta negro + amarillo verdoso
- Spark Digital Agency (Dribbble) - Timeline numerado

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

**Krea Studio**
- Email: hola@kreastudio.com
- Web: [kreastudio.com](#)

---

Hecho con ❤️ por Krea Studio