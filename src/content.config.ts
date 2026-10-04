import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pieces = defineCollection({
	loader: glob({
		pattern: "**/*.md",
		base: "./src/data/pieces",
	}),

	schema: z
		.object({
			number: z.number(),
			title: z.string(),
			description: z.string(),
			published: z.coerce.date().optional(),
			draft: z.boolean().default(false),
			socialImage: z.string().optional(),
		})
		.refine((piece) => piece.draft || piece.published, {
			message: "Published pieces must have a publication date.",
			path: ["published"],
		}),
});

export const collections = { pieces };
