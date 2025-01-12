/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{html,js}",
      "./index.html",
      "./src/App.jsx",
      "./src/client/product/ProductDetail.jsx",
      "./src/client/header/Header.jsx",
      "./src/client/header/BreadCrumb.jsx"
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
