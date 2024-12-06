# KrrishCo Brand Guidelines

## Brand Identity

### Logo
- Primary logo should be used in blue (#0284c7) on light backgrounds
- White version for dark backgrounds
- Minimum clear space: Equal to the height of the "K" in the logo
- Minimum size: 32px height for digital use

## Typography

### Primary Fonts
- **Headings**: Outfit (300, 400, 500, 600, 700)
  - Used for all headings and titles
  - Provides a modern, professional appearance
  - Implementation: `font-family: var(--font-family-heading)`

- **Body**: Poppins (300, 400, 500, 600, 700)
  - Used for body text, paragraphs, and UI elements
  - Excellent readability at all sizes
  - Implementation: `font-family: var(--font-family-body)`

### Font Implementation
Fonts are loaded via Google Fonts CDN for optimal performance and caching:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Typography Scale
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

## Color Palette

### Primary Colors
- Primary 50: #f0f9ff
- Primary 100: #e0f2fe
- Primary 200: #bae6fd
- Primary 300: #7dd3fc
- Primary 400: #38bdf8
- Primary 500: #0ea5e9
- Primary 600: #0284c7
- Primary 700: #0369a1
- Primary 800: #075985
- Primary 900: #0c4a6e

### Accent Colors
- Orange 500: #f97316
- Orange 600: #ea580c
- Orange 700: #c2410c

- Steel 500: #64748b
- Steel 600: #475569
- Steel 700: #334155

### Dark Mode Colors
- Background: #0f172a
- Background Soft: #1e293b
- Surface: #1e293b
- Surface Soft: #334155
- Text Primary: #f8fafc
- Text Secondary: #cbd5e1

## Component Guidelines

### Buttons
- Primary Button: Uses primary-600 color
- Secondary Button: Uses accent-steel-600 color
- Hover states use the next darker shade (700)
- Consistent padding: var(--space-sm) var(--space-md)
- Border radius: var(--radius-md)
- Smooth transitions: var(--transition-normal)

### Cards
- White background (light mode)
- Surface color background (dark mode)
- Border radius: var(--radius-lg)
- Padding: var(--space-md)
- Box shadow: var(--shadow-md)
- Hover transform: translateY(-2px)

## Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

## Transitions
- Fast: 200ms ease-in-out
- Normal: 300ms ease-in-out
- Slow: 500ms ease-in-out

## Border Radius
- sm: 0.25rem
- md: 0.5rem
- lg: 1rem
- xl: 1.5rem

## Best Practices
1. Always use CSS variables for consistency
2. Maintain dark mode support across components
3. Use semantic HTML elements
4. Follow accessibility guidelines
5. Keep transitions smooth and consistent
6. Use proper font weights for hierarchy
7. Maintain consistent spacing

## Voice and Tone
- Professional yet approachable
- Clear and concise
- Industry-focused
- Solution-oriented
- Confident but not boastful

## Image Guidelines
- Use high-quality industrial photography
- Maintain consistent color grading
- Show real work environments
- Include people when possible to add human element

## Social Media
- Use consistent brand colors
- Maintain professional imagery
- Follow typography guidelines
- Include company logo where appropriate
- Use approved hashtags and mentions

## Digital Applications

### Website
- Maintain responsive design
- Follow accessibility guidelines
- Use consistent component styling
- Implement proper dark mode

### Email
- Use web-safe fonts
- Follow color palette
- Include logo in header
- Maintain brand voice

### Social Media
- Use consistent hashtags
- Follow image guidelines
- Maintain brand voice
- Use approved templates
