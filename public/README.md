# Lumen Network - Logo & Brand Assets

## Logo Files

- **logo.svg** - Logo utama Lumen Network (460x460px)
- **favicon.svg** - Favicon untuk browser modern

## Logo Specifications

### Format
- **File Type**: SVG (Scalable Vector Graphics)
- **Dimensions**: 460 x 460 pixels
- **Color Mode**: RGB
- **Background**: Transparent with dark blue (#000E24)

### Color Palette
Primary colors used in the logo:
- `#0AD5C5` - Primary cyan/teal
- `#11D3DD` - Bright cyan
- `#29CB88` - Green accent
- `#36DCE4` - Light cyan
- `#3DC9AC` - Teal green
- `#000E24` - Deep navy (background)

### Usage Guidelines

1. **Minimum Size**: Logo should not be displayed smaller than 32x32px
2. **Clear Space**: Maintain minimum clear space around logo equal to height of the "L" character
3. **Background**: Logo works best on dark backgrounds, but is visible on light backgrounds

## Implementation

### HTML/React
```jsx
<img src="/logo.svg" alt="Lumen Network Logo" width="40" height="40" />
```

### Favicon
The favicon is automatically loaded in the document head:
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

## File Locations

- Website Header: `/src/components/Header.tsx`
- Website Footer: `/src/components/Footer.tsx`
- Document Head: `/src/pages/_document.tsx`

---

© 2026 Lumen Network. All rights reserved.
