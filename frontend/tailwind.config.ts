import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        button:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(199,223,233,1) 100%)",
      },
      boxShadow: {
        inner2xl: "inset 0 2px 6px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
