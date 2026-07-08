# ShopEasy UI Theme Guide

## Design Philosophy

ShopEasy follows a clean, premium, and timeless design language. The interface should feel calm, spacious, and trustworthy rather than playful. Every screen should emphasize products and content instead of decorative UI elements.

### Core Principles

- Neutral and elegant visual hierarchy
- Sharp geometry with subtle corners
- Consistent spacing throughout the application
- Minimal use of colors
- Strong typography hierarchy
- High readability
- Functional animations only
- Consistent component sizing across all screens

---

# Visual Identity

### Style

- Modern
- Minimal
- Premium
- Professional
- Soft earth tones
- Low visual noise

### Inspiration

- Muji
- Notion
- Apple Store
- Zara
- Uniqlo

---

# Color Palette

## Primary

| Purpose | Color |
|----------|---------|
| Primary | `#7A4E16` |
| Primary Dark | `#5D3A11` |
| Primary Light | `#A36A2A` |

Used for

- Primary buttons
- Active icons
- Selected tabs
- Links
- Important actions

---

## Accent

`#7E9B76`

Used sparingly for

- Success highlights
- Secondary actions
- Decorative accents

---

## Backgrounds

| Usage | Color |
|--------|---------|
| App Background | `#F7F3EC` |
| Cards | `#FFFFFF` |

---

## Text

| Usage | Color |
|--------|---------|
| Primary Text | `#3D2B1F` |
| Secondary Text | `#786A5D` |

---

## Feedback

Success

`#4D7C59`

Warning

`#C58A2A`

Error

`#B24B43`

Disabled

`#C9C1B7`

Border

`#DDD5C8`

Shadow

`rgba(0,0,0,0.08)`

---

# Typography

## Logo

Font

Arsenal

Usage

- Splash Screen
- Welcome Screen
- Branding

---

## Headings

Font

Manrope

Weights

- 600
- 700
- 800

Usage

- Screen titles
- Section headers
- Important labels

---

## Body Text

Font

Inter

Weights

- 400
- 500
- 600
- 700

Usage

- Paragraphs
- Product information
- Buttons
- Forms
- Navigation

---

# Typography Scale

| Style | Size |
|--------|------|
| Display | 36 |
| H1 | 36 |
| H2 | 28 |
| H3 | 22 |
| Title | 18 |
| Body | 16 |
| Small Body | 14 |
| Caption | 12 |

---

# Border Radius

The UI intentionally avoids rounded, playful interfaces.

| Size | Value |
|-------|------|
| XS | 4 |
| SM | 6 |
| MD | 8 |
| LG | 12 |
| XL | 16 |

### Usage

Buttons

`6`

Cards

`8`

Inputs

`6`

Images

`8`

Product Cards

`8`

Modal

`12`

Avoid pill-shaped components except where absolutely necessary.

---

# Spacing System

Use an 8-point grid.

| Token | Value |
|--------|------|
| XS | 4 |
| SM | 8 |
| MD | 16 |
| LG | 24 |
| XL | 32 |
| XXL | 48 |

Never use arbitrary spacing values unless required by layout.

---

# Elevation

Use elevation conservatively.

### Cards

```
Shadow Color
rgba(0,0,0,0.08)

Offset
0 2

Radius
6

Opacity
1
```

Large shadows should be avoided.

---

# Buttons

## Primary Button

Background

Primary Brown

Text

White

Border Radius

6

Height

48

Padding Horizontal

24

Shadow

Small

---

## Secondary Button

Background

Transparent

Border

1px Primary

Text

Primary

---

## Text Button

No background

Primary text color

---

# Input Fields

Background

White

Border

1px Border Color

Radius

6

Padding

16

Label above input

Placeholder uses secondary text color.

Error state uses Error Red.

---

# Cards

Background

White

Radius

8

Border

Optional 1px Border

Padding

16

Spacing between cards

16

---

# Product Cards

Include

- Product Image
- Product Name
- Category
- Price
- Rating
- Wishlist Icon

Image corners

Radius 8

Use subtle shadows only.

---

# Navigation

## Bottom Tab

Background

White

Active Icon

Primary

Inactive Icon

Secondary Text

Height

60

---

## Drawer

Simple white background.

Minimal icons.

Clear typography.

No gradients.

---

# Icons

Use

Material Community Icons

or

Lucide Icons

Icon Size

24

Small Icons

20

Large Icons

28

---

# Images

Product images should

- Maintain aspect ratio
- Use white cards
- Never stretch
- Prefer square thumbnails

Profile images

Radius

8

---

# Lists

Vertical spacing

16

Horizontal padding

16

Dividers

Optional

Very subtle

---

# Animations

Animations should be subtle.

Allowed

- Fade
- Scale (0.98 press effect)
- Slide
- Loading shimmer

Avoid

- Bounce
- Overshoot
- Elastic
- Excessive motion

---

# Component Rules

## Buttons

- Height 48
- Radius 6
- Bold text

## Inputs

- Height 48
- Radius 6

## Cards

- Radius 8

## Product Images

- Radius 8

## Floating Action Button

Avoid unless required.

---

# Screen Layout

Every screen should follow

```
SafeAreaView

↓

Header

↓

Main Content

↓

Bottom Navigation
```

Horizontal padding

16

Vertical spacing

24

Maximum consistency across every screen.

---

# General Guidelines

Do

- Use whitespace generously
- Keep layouts symmetrical
- Maintain consistent spacing
- Use typography for hierarchy
- Prefer simple shapes
- Keep interfaces calm and uncluttered

Avoid

- Large rounded corners
- Bright saturated colors
- Heavy gradients
- Excessive shadows
- Inconsistent spacing
- Decorative UI elements
- More than one accent color on a screen

---

# Platform-Specific UI Guidelines

To provide a native experience on both Android and iOS, the application follows platform-specific styling while maintaining the same overall design language.

## Colors

- Use the same color palette across both platforms.
- Android buttons use `COLORS.primary`.
- iOS buttons use `COLORS.primaryDark` for a slightly richer appearance.

---

## Typography

Typography is shared between platforms, but font sizes are slightly adjusted.

| Element | Android | iOS |
|---------|---------|-----|
| Display | 44 | 46 |
| H1 | 44 | 46 |
| H2 | 32 | 34 |
| Body | 16 | 17 |
| Small | 14 | 15 |

This compensates for iOS rendering fonts slightly smaller than Android.

---

## Spacing

Spacing is scaled depending on platform.

- Android uses the base spacing scale.
- iOS increases spacing by approximately 10%.

Example:

| Token | Android | iOS |
|-------|---------|-----|
| xs | 8 | 8.8 |
| sm | 12 | 13.2 |
| md | 16 | 17.6 |
| lg | 24 | 26.4 |

---

## Border Radius

Android follows Material Design with slightly sharper corners.

| Component | Android | iOS |
|----------|---------|-----|
| Small | 6 | 8 |
| Medium | 8 | 12 |
| Large | 12 | 16 |

---

## Shadows

Shadows are platform-specific.

### Android

- Uses `elevation`.
- No shadowColor or shadowRadius.

Example

```js
elevation: 4
```

### iOS

Uses native shadow properties.

```js
shadowColor: "#000",
shadowOffset: {
    width: 0,
    height: 2,
},
shadowOpacity: 0.12,
shadowRadius: 8,
```

All cards and buttons use these platform-specific shadow styles through the shared `SHADOW` theme.

---

## Buttons

Buttons follow each platform's native interaction pattern.

### Android

- Height: **48**
- Background: `COLORS.primary`
- Ripple effect enabled
- Elevation-based shadow

```jsx
android_ripple={{
    color: COLORS.primaryLight,
}}
```

### iOS

- Height: **52**
- Background: `COLORS.primaryDark`
- Opacity press feedback
- Rounded corners
- Native iOS shadows

```jsx
pressed && styles.buttonPressed
```

---

## Text Inputs

### Android

- Height: **48**
- Border radius: **8**
- Vertical padding: **8**

### iOS

- Height: **52**
- Border radius: **12**
- Vertical padding: **12**

This matches the native appearance of text fields on both platforms.

---

## Forms

All authentication and form screens use:

```jsx
behavior={Platform.OS === "ios" ? "padding" : "height"}
```

This ensures the keyboard behaves correctly on both operating systems.

---

## Cards

Cards share the same layout while using platform-specific shadows.

### Android

- Elevation-based shadow

### iOS

- Native shadow properties
- Slightly softer appearance

---

## Press Feedback

### Android

Uses Material ripple.

```jsx
android_ripple={{
    color: COLORS.primaryLight,
}}
```

### iOS

Uses opacity feedback.

```jsx
style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
]}
```

---

## Images

Images may be slightly larger on iOS for better visual balance.

Example:

| Platform | Logo Size |
|----------|-----------|
| Android | 160 × 160 |
| iOS | 180 × 180 |

---

## Screen Layout

Containers use shared spacing while allowing minor platform adjustments.

### Android

```js
paddingTop: SPACING.sm
```

### iOS

```js
paddingTop: 0
```

This improves alignment with the Android status bar while preserving iOS Safe Area behavior.

---

## Design Principle

Platform-specific styling is implemented through:

- `Platform.OS`
- `Platform.select()`

The application maintains a consistent visual identity while respecting Android Material Design conventions and Apple's Human Interface Guidelines.