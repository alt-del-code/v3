import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { collection, fields, config as config$1 } from '@keystatic/core';
import React from 'react';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return process.env.KEYSTATIC_GITHUB_CLIENT_ID;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return process.env.KEYSTATIC_SECRET;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const heroSlides = collection({
  label: "Hero Slides",
  slugField: "title",
  path: "src/content/hero-slides/*",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    image: fields.image({
      label: "Slide Image",
      directory: "public/assets/images",
      publicPath: "/assets/images"
    }),
    serviceTitle: fields.text({ label: "Service Title" }),
    serviceDescription: fields.text({
      label: "Service Description",
      multiline: true
    }),
    icon: fields.text({ label: "Icon Name" }),
    link: fields.text({ label: "Service Link" }),
    order: fields.number({ label: "Display Order" }),
    content: fields.mdx({
      label: "Content",
      options: {
        formatting: true,
        dividers: true,
        links: true,
        images: true
      }
    })
  }
});

const about = collection({
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
        icon: fields.text({ label: "Icon Name" })
      }),
      {
        label: "Company Values",
        itemLabel: (props) => props.fields.title.value || "Value",
        validation: { isRequired: false }
      }
    ),
    stats: fields.array(
      fields.object({
        value: fields.text({ label: "Stat Value" }),
        label: fields.text({ label: "Stat Label" }),
        description: fields.text({ label: "Stat Description" })
      }),
      {
        label: "Company Stats",
        itemLabel: (props) => props.fields.label.value || "Stat",
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
        })
      }),
      {
        label: "Team Members",
        itemLabel: (props) => props.fields.name.value || "Team Member",
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
        })
      }),
      {
        label: "Certifications",
        itemLabel: (props) => props.fields.name.value || "Certification",
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
      })
    }, {
      label: "Meta Information",
      validation: { isRequired: false }
    })
  }
});

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
    publicPath: "/src/assets/images/portfolio"
  }),
  additionalImages: fields.array(
    fields.image({
      label: "Additional Image",
      directory: "src/assets/images/portfolio",
      publicPath: "/src/assets/images/portfolio"
    }),
    {
      label: "Additional Images",
      itemLabel: (props) => props.value ? "Image" : "Add Image"
    }
  ),
  content: fields.document({
    label: "Details",
    formatting: true,
    dividers: true,
    links: true,
    images: {
      directory: "src/assets/images/portfolio",
      publicPath: "/src/assets/images/portfolio"
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
    })
  }, {
    label: "SEO Information"
  })
};
const fabrication = collection({
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
const materials = collection({
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

const blog = collection({
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
        itemLabel: (props) => props.value || "Category"
      }
    ),
    content: fields.document({
      label: "Content",
      formatting: true,
      dividers: true,
      links: true,
      images: {
        directory: "src/assets/images/blog",
        publicPath: "/src/assets/images/blog"
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
      })
    }, {
      label: "SEO Information"
    })
  }
});

const BrandMark = () => {
  return React.createElement("div", {
    style: {
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "🚀");
};
const config = config$1({
  storage: {
    kind: "local",
    repo: {
      owner: "alt-del-code",
      name: "v3"
    }
  },
  ui: {
    brand: {
      name: "Krrishco CMS",
      mark: BrandMark
    },
    navigation: {
      Content: ["hero-slides", "about"],
      Portfolio: ["fabrication", "materials"],
      Blog: ["blog"]
    }
  },
  collections: {
    "hero-slides": heroSlides,
    "about": about,
    "fabrication": fabrication,
    "materials": materials,
    "blog": blog
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
