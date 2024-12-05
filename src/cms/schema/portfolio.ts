import { collection, fields } from "@keystatic/core";

const baseSchema = {
  title: fields.slug({ 
    name: { 
      label: "Title",
      validation: { isRequired: true }
    }
  }),
  description: fields.text({ 
    label: "Description",
    multiline: true,
    validation: { isRequired: true }
  }),
  date: fields.date({
    label: "Date",
    defaultValue: { kind: "today" }
  }),
  image: fields.image({
    label: "Main Image",
    directory: "src/assets/images/portfolio",
    publicPath: "/src/assets/images/portfolio",
  }),
  additionalImages: fields.array(
    fields.image({
      label: "Additional Image",
      directory: "src/assets/images/portfolio",
      publicPath: "/src/assets/images/portfolio",
    }),
    {
      label: "Additional Images",
      itemLabel: (props) => props.value ? "Image" : "Add Image",
    }
  ),
  content: fields.document({
    label: "Details",
    formatting: true,
    dividers: true,
    links: true,
    images: {
      directory: "src/assets/images/portfolio",
      publicPath: "/src/assets/images/portfolio",
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
};

export const fabrication = collection({
  label: "Fabrication Projects",
  path: "src/content/fabrication/*",
  slugField: "title",
  format: { contentField: "content" },
  schema: {
    ...baseSchema,
    category: fields.select({
      label: "Category",
      defaultValue: "metal",
      options: [
        { label: "Metal", value: "metal" },
        { label: "Structural", value: "structural" },
        { label: "Custom", value: "custom" }
      ],
      validation: { isRequired: true }
    }),
    clientName: fields.text({
      label: "Client Name"
    }),
    technologies: fields.array(
      fields.text({ label: "Technology" }),
      {
        label: "Technologies Used",
        itemLabel: (props) => props.value || "Technology"
      }
    )
  }
});

export const materials = collection({
  label: "Material Supply",
  path: "src/content/materials/*",
  slugField: "title",
  format: { contentField: "content" },
  schema: {
    ...baseSchema,
    category: fields.select({
      label: "Category",
      defaultValue: "raw",
      options: [
        { label: "Raw", value: "raw" },
        { label: "Processed", value: "processed" },
        { label: "Hardware", value: "hardware" }
      ],
      validation: { isRequired: true }
    }),
    specifications: fields.array(
      fields.text({ 
        label: "Specification",
        multiline: true
      }),
      {
        label: "Material Specifications",
        itemLabel: (props) => props.value || "Specification"
      }
    )
  }
});