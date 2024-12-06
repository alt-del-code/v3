import { config, collection, fields } from "@keystatic/core";
import { heroSlides } from "./src/cms/schema/hero-slides";
import { about } from "./src/cms/schema/about";
import { fabrication, materials } from "./src/cms/schema/portfolio";
import { blog } from './src/cms/schema/blog';
import React from 'react';

const BrandMark = () => {
  return React.createElement('div', {
    style: {
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }, '🚀');
};

export default config({
  storage: {
    kind: 'local',
    repo: {
      owner: 'alt-del-code',
      name: 'v3',
    },
  },
  ui: {
    brand: {
      name: 'Krrishco CMS',
      mark: BrandMark,
    },
    navigation: {
      Content: ['hero-slides', 'about'],
      Portfolio: ['fabrication', 'materials'],
      Blog: ['blog'],
    },
  },
  collections: {
    "hero-slides": heroSlides,
    "about": about,
    "fabrication": fabrication,
    "materials": materials,
    "blog": blog,
  }
});
