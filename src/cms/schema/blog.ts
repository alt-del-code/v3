import { collection, fields } from "@keystatic/core";

export const blog = collection({
  label: "Blog Posts",
  path: "src/content/blog/*",
  slugField: "title",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ 
      name: { 
        label: "Title",
        validation: { isRequired: true }
      } 
    }),
    publishDate: fields.date({ 
      label: "Publish Date",
      validation: { isRequired: true },
      defaultValue: { kind: "today" }
    }),
    author: fields.text({ 
      label: "Author",
      validation: { isRequired: true }
    }),
    excerpt: fields.text({ 
      label: "Excerpt",
      multiline: true,
      validation: { 
        length: { min: 1 },
        isRequired: true
      }
    }),
    featuredImage: fields.image({
      label: "Featured Image",
      directory: "src/assets/images/blog",
      publicPath: "/src/assets/images/blog",
      validation: { isRequired: true }
    }),
    categories: fields.array(
      fields.text({ label: "Category" }),
      {
        label: "Categories",
        itemLabel: props => props.value || "Category"
      }
    ),
    content: fields.document({
      label: "Content",
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: "src/assets/images/blog",
        publicPath: "/src/assets/images/blog",
      }
    }),
    meta: fields.object({
      title: fields.text({ 
        label: "Meta Title",
        validation: { isRequired: true }
      }),
      description: fields.text({ 
        label: "Meta Description",
        multiline: true,
        validation: { isRequired: true }
      }),
    }, {
      label: "SEO Information"
    })
  }
}); 