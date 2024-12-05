import { collection, fields } from "@keystatic/core";

export const about = collection({
  label: "About",
  path: "src/content/about/*",
  slugField: "title",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ 
      name: { 
        label: "Title",
        validation: {
          isRequired: true
        }
      } 
    }),
    subtitle: fields.text({ 
      label: "Subtitle",
      validation: { 
        length: { min: 1 },
        isRequired: true
      }
    }),
    intro: fields.text({
      label: "Introduction",
      multiline: true,
      validation: { isRequired: false }
    }),
    vision: fields.text({
      label: "Vision",
      multiline: true,
      validation: { isRequired: false }
    }),
    mission: fields.text({
      label: "Mission",
      multiline: true,
      validation: { isRequired: false }
    }),
    content: fields.document({
      label: "Main Content",
      formatting: true,
      dividers: true,
      links: true,
      validation: { isRequired: false }
    }),
    values: fields.array(
      fields.object({
        title: fields.text({ label: "Value Title" }),
        description: fields.text({ label: "Value Description", multiline: true }),
        icon: fields.text({ label: "Icon Name" }),
      }),
      {
        label: "Company Values",
        itemLabel: props => props.fields.title.value || "Value",
        validation: { isRequired: false }
      }
    ),
    stats: fields.array(
      fields.object({
        value: fields.text({ label: "Stat Value" }),
        label: fields.text({ label: "Stat Label" }),
        description: fields.text({ label: "Stat Description" }),
      }),
      {
        label: "Company Stats",
        itemLabel: props => props.fields.label.value || "Stat",
        validation: { isRequired: false }
      }
    ),
    team: fields.array(
      fields.object({
        name: fields.text({ label: "Member Name" }),
        position: fields.text({ label: "Position" }),
        bio: fields.text({ label: "Biography", multiline: true }),
        image: fields.image({
          label: "Profile Image",
          directory: "src/assets/images/team",
          publicPath: "/src/assets/images/team",
          validation: { isRequired: false }
        }),
      }),
      {
        label: "Team Members",
        itemLabel: props => props.fields.name.value || "Team Member",
        validation: { isRequired: false }
      }
    ),
    certifications: fields.array(
      fields.object({
        name: fields.text({ label: "Certification Name" }),
        issuer: fields.text({ label: "Issuer" }),
        year: fields.text({ label: "Year" }),
        image: fields.image({
          label: "Certificate Image",
          directory: "src/assets/images/certifications",
          publicPath: "/src/assets/images/certifications",
          validation: { isRequired: false }
        }),
      }),
      {
        label: "Certifications",
        itemLabel: props => props.fields.name.value || "Certification",
        validation: { isRequired: false }
      }
    ),
    meta: fields.object({
      title: fields.text({ 
        label: "Meta Title",
        validation: { isRequired: false }
      }),
      description: fields.text({ 
        label: "Meta Description",
        multiline: true,
        validation: { isRequired: false }
      }),
    }, {
      label: "Meta Information",
      validation: { isRequired: false }
    })
  }
});