import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "background-hover": "var(--background-hover)",
        "foreground-primary": "var(--foreground-primary)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-hover": "var(--foreground-hover)",
        "accent": "var(--foreground-hover)",

        "border": "var(--border)",

      },
      boxShadow: {
        "header-shadow": "var(--header-shadow)"
      }
    },
  },
  plugins: []
};
export default config;
