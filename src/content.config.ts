import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pieces = defineCollection({
	loader: glob({
		pattern: "**/*.md",
		base: "./src/data/pieces",
	}),

	schema: z.object({
		number: z.number(),
		title: z.string(),
		description: z.string(),
		published: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { pieces };