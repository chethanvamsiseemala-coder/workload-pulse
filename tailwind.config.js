// tailwind.config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // Add this daisyui object to enable the themes:
  daisyui: {
    themes: ["light", "dark", "cyberpunk", "synthwave"],
  },
}