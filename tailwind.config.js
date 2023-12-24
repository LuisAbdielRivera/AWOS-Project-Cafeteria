/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        'beige-claro' : '#e8c39e',
        'rosa-palido' : '#eaccad',
        'crema' : '#f3dbc3',
        'marron-oscuro' : '#804000',
        'naranja-marron' : '#9e6730'
      }
    },
  },
  plugins: [],
}

