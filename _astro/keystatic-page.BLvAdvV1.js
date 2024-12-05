import{j as l}from"./react-vendor.BdeMnmW3.js";import{K as s,i as a,j as e,k as r}from"./keystatic-core.BxPfpRkd.js";import"./keystatic-api.DtlsqLj8.js";import"./aos.DangSV3_.js";import"./markdown.D3Gd4Avb.js";const o={envName:"PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",value:void 0};function n(t){return function(){return l.jsx(s,{config:t,appSlug:o})}}const u=a({label:"Hero Slides",slugField:"title",path:"src/content/hero-slides/*",format:{contentField:"content"},schema:{title:e.slug({name:{label:"Title"}}),image:e.image({label:"Slide Image",directory:"src/assets/images",publicPath:"/src/assets/images"}),serviceTitle:e.text({label:"Service Title"}),serviceDescription:e.text({label:"Service Description",multiline:!0}),icon:e.text({label:"Icon Name"}),link:e.text({label:"Service Link"}),order:e.number({label:"Display Order"}),content:e.mdx({label:"Content",formatting:!0,dividers:!0,links:!0,images:!0})}}),c=a({label:"About",path:"src/content/about/*",slugField:"title",format:{contentField:"content"},schema:{title:e.slug({name:{label:"Title",validation:{isRequired:!0}}}),subtitle:e.text({label:"Subtitle",validation:{length:{min:1},isRequired:!0}}),intro:e.text({label:"Introduction",multiline:!0,validation:{isRequired:!1}}),vision:e.text({label:"Vision",multiline:!0,validation:{isRequired:!1}}),mission:e.text({label:"Mission",multiline:!0,validation:{isRequired:!1}}),content:e.document({label:"Main Content",formatting:!0,dividers:!0,links:!0,validation:{isRequired:!1}}),values:e.array(e.object({title:e.text({label:"Value Title"}),description:e.text({label:"Value Description",multiline:!0}),icon:e.text({label:"Icon Name"})}),{label:"Company Values",itemLabel:t=>t.fields.title.value||"Value",validation:{isRequired:!1}}),stats:e.array(e.object({value:e.text({label:"Stat Value"}),label:e.text({label:"Stat Label"}),description:e.text({label:"Stat Description"})}),{label:"Company Stats",itemLabel:t=>t.fields.label.value||"Stat",validation:{isRequired:!1}}),team:e.array(e.object({name:e.text({label:"Member Name"}),position:e.text({label:"Position"}),bio:e.text({label:"Biography",multiline:!0}),image:e.image({label:"Profile Image",directory:"src/assets/images/team",publicPath:"/src/assets/images/team",validation:{isRequired:!1}})}),{label:"Team Members",itemLabel:t=>t.fields.name.value||"Team Member",validation:{isRequired:!1}}),certifications:e.array(e.object({name:e.text({label:"Certification Name"}),issuer:e.text({label:"Issuer"}),year:e.text({label:"Year"}),image:e.image({label:"Certificate Image",directory:"src/assets/images/certifications",publicPath:"/src/assets/images/certifications",validation:{isRequired:!1}})}),{label:"Certifications",itemLabel:t=>t.fields.name.value||"Certification",validation:{isRequired:!1}}),meta:e.object({title:e.text({label:"Meta Title",validation:{isRequired:!1}}),description:e.text({label:"Meta Description",multiline:!0,validation:{isRequired:!1}})},{label:"Meta Information",validation:{isRequired:!1}})}}),i={title:e.slug({name:{label:"Title",validation:{isRequired:!0}}}),description:e.text({label:"Description",multiline:!0,validation:{isRequired:!0}}),date:e.date({label:"Date",defaultValue:{kind:"today"}}),image:e.image({label:"Main Image",directory:"src/assets/images/portfolio",publicPath:"/src/assets/images/portfolio"}),additionalImages:e.array(e.image({label:"Additional Image",directory:"src/assets/images/portfolio",publicPath:"/src/assets/images/portfolio"}),{label:"Additional Images",itemLabel:t=>t.value?"Image":"Add Image"}),content:e.document({label:"Details",formatting:!0,dividers:!0,links:!0,images:{directory:"src/assets/images/portfolio",publicPath:"/src/assets/images/portfolio"}}),meta:e.object({title:e.text({label:"Meta Title",validation:{isRequired:!0}}),description:e.text({label:"Meta Description",multiline:!0,validation:{isRequired:!0}})},{label:"SEO Information"})},d=a({label:"Fabrication Projects",path:"src/content/fabrication/*",slugField:"title",format:{contentField:"content"},schema:{...i,category:e.select({label:"Category",defaultValue:"metal",options:[{label:"Metal",value:"metal"},{label:"Structural",value:"structural"},{label:"Custom",value:"custom"}],validation:{isRequired:!0}}),clientName:e.text({label:"Client Name"}),technologies:e.array(e.text({label:"Technology"}),{label:"Technologies Used",itemLabel:t=>t.value||"Technology"})}}),m=a({label:"Material Supply",path:"src/content/materials/*",slugField:"title",format:{contentField:"content"},schema:{...i,category:e.select({label:"Category",defaultValue:"raw",options:[{label:"Raw",value:"raw"},{label:"Processed",value:"processed"},{label:"Hardware",value:"hardware"}],validation:{isRequired:!0}}),specifications:e.array(e.text({label:"Specification",multiline:!0}),{label:"Material Specifications",itemLabel:t=>t.value||"Specification"})}}),b=a({label:"Blog Posts",path:"src/content/blog/*",slugField:"title",format:{contentField:"content"},schema:{title:e.slug({name:{label:"Title",validation:{isRequired:!0}}}),publishDate:e.date({label:"Publish Date",validation:{isRequired:!0},defaultValue:{kind:"today"}}),author:e.text({label:"Author",validation:{isRequired:!0}}),excerpt:e.text({label:"Excerpt",multiline:!0,validation:{length:{min:1},isRequired:!0}}),featuredImage:e.image({label:"Featured Image",directory:"src/assets/images/blog",publicPath:"/src/assets/images/blog",validation:{isRequired:!0}}),categories:e.array(e.text({label:"Category"}),{label:"Categories",itemLabel:t=>t.value||"Category"}),content:e.document({label:"Content",formatting:!0,dividers:!0,links:!0,images:{directory:"src/assets/images/blog",publicPath:"/src/assets/images/blog"}}),meta:e.object({title:e.text({label:"Meta Title",validation:{isRequired:!0}}),description:e.text({label:"Meta Description",multiline:!0,validation:{isRequired:!0}})},{label:"SEO Information"})}}),g=r({storage:{kind:"local"},collections:{"hero-slides":u,about:c,fabrication:d,materials:m,blog:b}}),R=n(g);export{R as Keystatic};