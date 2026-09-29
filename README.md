# The Urban Plate — Premium Restaurant & Cafe Website

A modern, responsive, high-performance website for **The Urban Plate**, a gourmet restaurant and cafe. Developed as a production-grade portfolio demo project by **Infinvo Tech**.

---

## 🍽️ Features & Overview

- **Design Aesthetic:** Warm cream (`#FAF7F2`), deep dark charcoal (`#1D211E`), burnt orange accents (`#C76B3C`), and muted olive (`#747B5C`). Editorial typography pairing Playfair Display with Inter.
- **Pages & Routing:**
  - `/` — **Homepage:** Cinematic hero, signature dishes, restaurant story preview, categories, culinary experience pillars, guest reviews, and in-page reservation booking.
  - `/menu` — **Full Menu:** 23 gourmet dishes across 5 categories with real-time keyword search, Veg / Non-Veg filters, category pill navigation with URL query parameter support, and empty states.
  - `/about` — **Our Story:** Heritage journey, 3 culinary badges, executive chef profile (demo), restaurant values, and zero-preservative food philosophy.
  - `/gallery` — **Photo Gallery:** Responsive masonry grid with categorized views (Food, Ambience, Events, Kitchen) and click-to-enlarge Lightbox with keyboard arrow navigation and Escape support.
  - `/contact` — **Contact & Location:** Fictional demo address, phone, opening hours, contact inquiry form, embedded location map, and direct WhatsApp chat trigger.
  - `/cart` — **Shopping Cart & Checkout Simulation:** Item quantity controls, removal, subtotal calculation, persistent state via `localStorage`, and automated WhatsApp order generation.
- **Table Reservation System:**
  - Modal booking and inline section on homepage.
  - Form validation: Name, valid phone format, future date, time slot, and guest count limits.
  - Generates pre-formatted WhatsApp booking messages directly addressed to the restaurant host.
- **Vercel Deployment Ready:** Includes `vercel.json` SPA rewrite rules so all deep routes refresh smoothly.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 with custom theme tokens
- **Animations:** Framer Motion
- **Icons:** Lucide React + custom SVG brand icons
- **Navigation:** React Router DOM (v7)
- **State Management:** React Context API + `useReducer` with `localStorage` persistence
- **Architecture:** Zero backend, zero paid APIs, client-side static data with realistic Indian & continental cafe demo content.

---

## ⚙️ Configuration

All restaurant contact details, WhatsApp routing number, addresses, and hours are centralized in:

📁 [`src/config/restaurant.ts`](file:///home/aniket/Desktop/My%20Portfolio/restaurant-demo/src/config/restaurant.ts)

```typescript
export const RESTAURANT_CONFIG = {
  name: 'The Urban Plate',
  tagline: 'Good Food. Great Company.',
  whatsappPhone: '919999999999', // Format: country code + number (no spaces or '+')
  address: '42, Sector 17, Chandigarh, India (Demo Address)',
  city: 'Chandigarh',
  email: 'hello@theurbanplate.com (Demo)',
  openingHours: {
    weekdays: '11:00 AM – 11:00 PM',
    weekends: '11:00 AM – 11:30 PM',
    display: 'Open Daily: 11:00 AM – 11:00 PM',
  },
  // ...
};
```

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## ☁️ Deploying to Vercel

This repository includes a [`vercel.json`](file:///home/aniket/Desktop/My%20Portfolio/restaurant-demo/vercel.json) rewrite file. You can deploy it instantly:

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import this repository.
4. Leave framework as **Vite** and build command as `npm run build`.
5. Click **Deploy**.

---

*Project created for client presentation & portfolio by Infinvo Tech.*
