import { defineConfig, defineCollection, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
    name: "Post",
    pattern: "blog",
    schema: s
        .object({
            slug: s.path(),
            title: s.string().max(256),
            description: s.string().max(512).optional(),
            date: s.isodate(),
            published: s.boolean().default(true),
            body: s.mdx(),
        })
        .transform(computedFields),
});

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        name: "[name]-[hash6].[ext]",
        assets: "public/static",
        base: "/static/",
        clean: true,
    },
    collections: { posts },
    mdx: {
        rehypePlugins: [],
        remarkPlugins: []
    }
});
