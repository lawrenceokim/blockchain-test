import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "50": "#ffeff1",
        "100": "#ffdce1",
        "200": "#ffbfc9",
        "300": "#ff92a2",
        "400": "#ff546e",
        "500": "#ff1f41",
        "600": "#ff0026",
        "700": "#db0021",
        "800": "#ad001a",
        "900": "#94081d",
        "950": "#52000c",
      },
    },
  },
  plugins: [],
};
export default config;
