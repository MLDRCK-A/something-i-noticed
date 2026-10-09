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
			socialImageAlt: z.string().optional(),

			epilogue: z
				.object({
					message: z.string().default("Thanks for reading."),
					supportText: z.string().optional(),
					image: z.string().default("/images/site/support-caveman.png"),
					imageAlt: z.string().default("A friendly caveman giving a thumbs-up"),
					showSupport: z.boolean().default(false),
				})
				.default({}),
		})
		.refine((piece) => piece.draft || piece.published, {
			message: "Published pieces must have a publication date.",
			path: ["published"],
		}),
});

export const collections = { pieces };
