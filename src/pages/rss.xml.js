import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const pieces = (await getCollection("pieces"))
		.filter((piece) => !piece.data.draft)
		.sort(
			(a, b) =>
				b.data.published.getTime() - a.data.published.getTime(),
		);

	return rss({
		title: "Something I Noticed",
		description: "Things I notice, and where they take me.",
		site: context.site,
		items: pieces.map((piece) => ({
			title: piece.data.title,
			description: piece.data.description,
			pubDate: piece.data.published,
			link: `/pieces/${piece.id}/`,
		})),
	});
}