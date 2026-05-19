/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors
        'surface': '#131313',
        'surface-dim': '#131313',
        'surface-bright': '#3a3939',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-variant': '#353534',
        
        // Primary colors
        'primary': '#ffffff',
        'primary-fixed': '#b8f600',
        'primary-fixed-dim': '#a1d800',
        'primary-container': '#b8f600',
        'on-primary': '#253500',
        'on-primary-container': '#506e00',
        'on-primary-fixed': '#141f00',
        'on-primary-fixed-variant': '#384e00',
        'inverse-primary': '#4b6700',
        
        // Secondary colors
        'secondary': '#c8c6c5',
        'secondary-fixed': '#e5e2e1',
        'secondary-fixed-dim': '#c8c6c5',
        'secondary-container': '#4a4949',
        'on-secondary': '#313030',
        'on-secondary-container': '#bab8b7',
        'on-secondary-fixed': '#1c1b1b',
        'on-secondary-fixed-variant': '#474646',
        
        // Tertiary colors
        'tertiary': '#ffffff',
        'tertiary-fixed': '#c8f22f',
        'tertiary-fixed-dim': '#add500',
        'tertiary-container': '#c8f22f',
        'on-tertiary': '#293500',
        'on-tertiary-container': '#576c00',
        'on-tertiary-fixed': '#171e00',
        'on-tertiary-fixed-variant': '#3d4d00',
        
        // Surface text colors
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c3caad',
        'inverse-surface': '#e5e2e1',
        'inverse-on-surface': '#313030',
        
        // Error colors
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        
        // Outline colors
        'outline': '#8d9479',
        'outline-variant': '#434933',
        
        // Background & text
        'background': '#131313',
        'on-background': '#e5e2e1',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
        'border-subtle': '#262626',
        
        // Accent & effects
        'surface-tint': '#a1d800',
        'accent': '#BFFF0B',
        'accent-hover': '#D4FF3D',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        'container-max': '1440px',
        'gutter': '24px',
        'margin-desktop': '80px',
        'margin-mobile': '20px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        'section-gap': '120px',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(191, 255, 11, 0.3)',
        'glow-md': '0 0 40px rgba(191, 255, 11, 0.4)',
        'glow-lg': '0 0 60px rgba(191, 255, 11, 0.5)',
      },
      backdropBlur: {
        'nav': '12px',
      },
    },
  },
  plugins: [],
}