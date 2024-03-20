import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        ShuterGrey:'#5F6368',
        ShuterGreyLight: '#f6f7f7',
        AliceBlue: '#F1F3F4',
        BlackRussian: '#202124',
        Oasis: '#FEEFCE',
        DarkGrayishBlue: '#3c4043',
        AliceBlueDark: '#e6eaeb',
        Charchol: '#262626',
        SubtleGray: '#CCCCCC',
      },
    },
  },
  plugins: [],
};
export default config;
