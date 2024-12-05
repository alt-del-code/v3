import { defineCollection, z } from 'astro:content';

const heroSlides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    serviceTitle: z.string(),
    serviceDescription: z.string(),
    icon: z.string(),
    link: z.string(),
    order: z.number()
  })
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    intro: z.string().optional(),
    vision: z.string().optional(),
    mission: z.string().optional(),
    content: z.string().optional(),
    values: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional().default([]),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      description: z.string()
    })).optional().default([]),
    team: z.array(z.object({
      name: z.string(),
      position: z.string(),
      bio: z.string(),
      image: z.string().optional()
    })).optional().default([]),
    certifications: z.array(z.object({
      name: z.string(),
      issuer: z.string(),
      year: z.string(),
      image: z.string().optional()
    })).optional().default([]),
    meta: z.object({
      title: z.string(),
      description: z.string()
    }).optional().default({
      title: '',
      description: ''
    })
  })
});

const portfolioItems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'metal-fabrication',
      'structural-work',
      'custom-solutions',
      'raw-materials',
      'processed-materials',
      'hardware-solutions'
    ]),
    clientName: z.string(),
    completionDate: z.date(),
    images: z.array(z.string()).optional().default([]),
    technologies: z.array(z.string()).optional().default([]),
    systemComponents: z.array(z.string()).optional().default([]),
    outcomeBenefits: z.string().optional(),
    content: z.string().optional(),
    meta: z.object({
      title: z.string(),
      description: z.string()
    })
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    featuredImage: z.string(),
    categories: z.array(z.string()).default([]),
    meta: z.object({
      title: z.string(),
      description: z.string()
    })
  })
});

const fabrication = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    additionalImages: z.array(z.string()).default([]),
    meta: z.object({
      title: z.string(),
      description: z.string()
    }),
    category: z.string(),
    technologies: z.array(z.string()).default([])
  })
});

const materials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    additionalImages: z.array(z.string()).default([]),
    meta: z.object({
      title: z.string(),
      description: z.string()
    }),
    category: z.string(),
    technologies: z.array(z.string()).default([])
  })
});

const hero = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    serviceTitle: z.string(),
    serviceDescription: z.string(),
    icon: z.string(),
    link: z.string(),
    order: z.number()
  })
});

export const collections = {
  'hero-slides': heroSlides,
  'about': about,
  'portfolio-items': portfolioItems,
  'blog': blog,
  fabrication,
  materials,
};
