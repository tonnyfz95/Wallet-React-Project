module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Esto asegura que Tailwind busque las clases en todos los archivos relevantes
  ],
  darkMode: 'class', // Habilita el modo oscuro basado en clase
  theme: {
    extend: {
      // Agregar configuraciones personalizadas si es necesario
    },
  },
  plugins: [],
}
