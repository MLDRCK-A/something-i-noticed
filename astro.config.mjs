import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://something-i-noticed.pages.dev",
	integrations: [sitemap()],
});
