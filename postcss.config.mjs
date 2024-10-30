/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': {}, // Habilita el anidamiento de CSS
    tailwindcss: {}, // Plugin principal de Tailwind
    autoprefixer: {}, // Añade prefijos de navegador automáticamente
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}) // Minifica CSS en producción
  },
};

export default config;