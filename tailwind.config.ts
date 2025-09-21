import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          DEFAULT: "1320px",
        },
        center: true, // Optional: Center the container
        padding: '2rem', // Optional: Add padding
      },
      colors: {
        primary: "#F51B1B",
        secondary: "#6D68FF",

      },
    },
  },
  plugins: [],
};

export default config;
