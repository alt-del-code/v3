import { config } from "@keystatic/core";
import { heroSlides } from "./src/cms/schema/hero-slides";
import { about } from "./src/cms/schema/about";
import { fabrication, materials } from "./src/cms/schema/portfolio";
import { blog } from './src/cms/schema/blog';

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    "hero-slides": heroSlides,
    "about": about,
    "fabrication": fabrication,
    "materials": materials,
    "blog": blog,
  },
});
