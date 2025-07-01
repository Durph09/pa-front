# Radix UI Styling Guide

This document describes the styling patterns and conventions used with Radix UI components in this project. It serves as a reference for AI agents to understand and maintain consistent styling across the application.

## Table of Contents
- [CSS Variables & Theme System](#css-variables--theme-system)
- [Component Styling Patterns](#component-styling-patterns)
- [Common Utility Classes](#common-utility-classes)
- [Animation Patterns](#animation-patterns)
- [Focus & Accessibility](#focus--accessibility)
- [Dark Mode Support](#dark-mode-support)
- [Component-Specific Patterns](#component-specific-patterns)

## CSS Variables & Theme System

### Core Color Variables
The project uses a comprehensive CSS variable system with HSL color values:

```css
/* Light mode colors */
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--card: 0 0% 100%;
--card-foreground: 0 0% 3.9%;
--popover: 0 0% 100%;
--popover-foreground: 0 0% 3.9%;
--primary: 0 0% 9%;
--primary-foreground: 0 0% 98%;
--secondary: 0 0% 96.1%;
--secondary-foreground: 0 0% 9%;
--muted: 0 0% 96.1%;
--muted-foreground: 0 0% 45.1%;
--accent: 0 0% 96.1%;
--accent-foreground: 0 0% 9%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 0 0% 98%;
--border: 0 0% 89.8%;
--input: 0 0% 89.8%;
--ring: 0 0% 3.9%;
--radius: 0.5rem;
```

### Dark Mode Colors
Dark mode automatically inverts the color scheme while maintaining contrast ratios.

### Sidebar-Specific Variables
```css
--sidebar: hsl(0 0% 98%);
--sidebar-foreground: hsl(240 5.3% 26.1%);
--sidebar-primary: hsl(240 5.9% 10%);
--sidebar-primary-foreground: hsl(0 0% 98%);
--sidebar-accent: hsl(240 4.8% 95.9%);
--sidebar-accent-foreground: hsl(240 5.9% 10%);
--sidebar-border: hsl(220 13% 91%);
--sidebar-ring: hsl(217.2 91.2% 59.8%);
```

## Component Styling Patterns

### Base Component Structure
All Radix UI components follow this pattern:
1. **Data Attributes**: Use `data-slot` for component identification
2. **Utility Classes**: Combine with `cn()` utility for conditional styling
3. **Variants**: Use `class-variance-authority` (cva) for component variants
4. **Accessibility**: Include proper focus states and ARIA attributes

### Common Base Classes
```css
/* Layout */
flex items-center justify-center
gap-2 whitespace-nowrap
rounded-md text-sm font-medium

/* Transitions */
transition-all
transition-[color,box-shadow]
transition-opacity

/* States */
disabled:pointer-events-none disabled:opacity-50
data-[state=open]:animate-in data-[state=closed]:animate-out
hover:bg-accent hover:text-accent-foreground

/* Focus States */
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
```

## Common Utility Classes

### Spacing & Layout
- `gap-2`: Standard component spacing
- `px-3 py-2`: Standard padding
- `h-9`: Standard input height
- `w-full`: Full width
- `min-w-0`: Prevent overflow

### Typography
- `text-sm`: Standard text size
- `font-medium`: Standard font weight
- `text-foreground`: Primary text color
- `text-muted-foreground`: Secondary text color
- `text-primary`: Primary brand color

### Borders & Shadows
- `border border-input`: Standard input border
- `rounded-md`: Standard border radius
- `shadow-xs`: Subtle shadow
- `shadow-md`: Medium shadow for overlays

### Backgrounds
- `bg-background`: Main background
- `bg-card`: Card background
- `bg-popover`: Popover background
- `bg-accent`: Accent background for hover states

## Animation Patterns

### Radix State Animations
```css
/* Open/Close animations */
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95

/* Slide animations */
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

### Custom Animations
```css
/* Accordion animations */
--animate-accordion-down: accordion-down 0.2s ease-out;
--animate-accordion-up: accordion-up 0.2s ease-out;

/* Pulse animation for loading states */
animate-pulse
```

## Focus & Accessibility

### Focus Ring Pattern
```css
/* Standard focus ring */
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2

/* Input-specific focus */
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

/* Invalid state focus */
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive
```

### Disabled States
```css
disabled:pointer-events-none
disabled:cursor-not-allowed
disabled:opacity-50
```

### Screen Reader Support
```css
/* Hide visually, show to screen readers */
sr-only

/* Ensure proper contrast */
text-balance
```

## Dark Mode Support

### Automatic Dark Mode
The project uses CSS custom properties that automatically adapt to dark mode:
- Light mode variables are defined in `:root`
- Dark mode variables are defined in `.dark`
- Components automatically use the appropriate colors

### Dark Mode Specific Adjustments
```css
/* Dark mode input styling */
dark:bg-input/30 dark:border-input dark:hover:bg-input/50

/* Dark mode destructive states */
dark:aria-invalid:ring-destructive/40
dark:bg-destructive/60
```

## Component-Specific Patterns

### Button Component
```css
/* Base button styles */
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all

/* Variants */
default: bg-primary text-primary-foreground shadow-xs hover:bg-primary/90
destructive: bg-destructive text-white shadow-xs hover:bg-destructive/90
outline: border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground
secondary: bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80
ghost: hover:bg-accent hover:text-accent-foreground
link: text-primary underline-offset-4 hover:underline

/* Sizes */
default: h-9 px-4 py-2 has-[>svg]:px-3
sm: h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5
lg: h-10 rounded-md px-6 has-[>svg]:px-4
icon: size-9
```

### Input Component
```css
/* Base input styles */
flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none

/* File input styling */
file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium

/* Placeholder styling */
placeholder:text-muted-foreground

/* Selection styling */
selection:bg-primary selection:text-primary-foreground
```

### Dialog/Modal Component
```css
/* Overlay */
fixed inset-0 z-50 bg-black/50
data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0

/* Content */
bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200
```

### Popover Component
```css
/* Content */
bg-popover text-popover-foreground z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden

/* Positioning */
data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
```

### Select Component
```css
/* Trigger */
flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none

/* Content */
bg-popover text-popover-foreground relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md
```

### Table Component
```css
/* Container */
relative w-full overflow-x-auto

/* Table */
w-full caption-bottom text-sm

/* Header */
[&_tr]:border-b

/* Body */
[&_tr:last-child]:border-0

/* Row */
hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors

/* Cell */
p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]
```

### Card Component
```css
/* Base card */
bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm

/* Header */
@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6

/* Content */
px-6 pt-0

/* Footer */
flex flex-col-reverse gap-2 sm:flex-row sm:justify-end px-6 pt-0
```

### Badge Component
```css
/* Base badge */
inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2

/* Variants */
default: border-transparent bg-primary text-primary-foreground hover:bg-primary/80
secondary: border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80
destructive: border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80
outline: text-foreground
```

### Checkbox Component
```css
/* Root */
peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground

/* Indicator */
flex items-center justify-center text-current
```

### Tooltip Component
```css
/* Content */
bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance

/* Arrow */
bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]
```

### Separator Component
```css
/* Base separator */
bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px
```

### Skeleton Component
```css
/* Base skeleton */
bg-accent animate-pulse rounded-md
```

## Best Practices

### 1. Use the `cn()` Utility
Always use the `cn()` utility function to combine classes:
```tsx
className={cn(
  "base-classes",
  conditional && "conditional-classes",
  className
)}
```

### 2. Follow Variant Patterns
Use `class-variance-authority` for component variants:
```tsx
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 3. Include Data Attributes
Always include `data-slot` attributes for component identification:
```tsx
<Component data-slot="component-name" />
```

### 4. Maintain Accessibility
- Include proper focus states
- Use semantic HTML elements
- Provide screen reader support
- Ensure proper contrast ratios

### 5. Support Dark Mode
- Use CSS custom properties for colors
- Test both light and dark modes
- Ensure proper contrast in both modes

### 6. Use Consistent Spacing
- Follow the established spacing scale
- Use consistent padding and margins
- Maintain visual hierarchy

This guide should be used as a reference when creating or modifying Radix UI components to ensure consistency across the application. 