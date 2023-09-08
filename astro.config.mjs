import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    define: {
      "process.env": process.env,
    },
  },
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
});
