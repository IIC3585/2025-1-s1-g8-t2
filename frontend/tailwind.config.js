/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(282, 100.00%, 60.00%)',   // amarillo fosforescente
        secondary: 'hsl(175, 83.60%, 61.80%)',  // rojo fosforescente
      }
    }
  },
  plugins: [],
}
