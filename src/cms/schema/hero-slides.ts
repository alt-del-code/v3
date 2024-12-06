import { collection, fields } from "@keystatic/core";

export const heroSlides = collection({
  label: "Hero Slides",
  slugField: "title",
  path: "src/content/hero-slides/*",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    image: fields.image({
      label: "Slide Image",
      directory: "src/assets/images",
      publicPath: "/assets/images",
    }),
    serviceTitle: fields.text({ label: "Service Title" }),
    serviceDescription: fields.text({
      label: "Service Description",
      multiline: true,
    }),
    icon: fields.text({ label: "Icon Name" }),
    link: fields.text({ label: "Service Link" }),
    order: fields.number({ label: "Display Order" }),
    content: fields.mdx({
      label: "Content",
      formatting: true,
      dividers: true,
      links: true,
      images: true,
    }),
  },
});
