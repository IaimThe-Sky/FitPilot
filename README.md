# FitPilot Web

A minimal Next.js landing page for FitPilot.

## Getting Started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

## Project Structure

- `app/page.tsx` - landing page
- `app/layout.tsx` - page metadata and root layout
- `app/dashboard`, `app/progress`, `app/coach`, `app/onboarding` - initial app routes
- `app/globals.css` - global styles and Tailwind import
- `components/dashboard` - personalized dashboard UI
- `components/layout` - reusable app shell and page width components
- `components/onboarding` - local-state onboarding flow UI
- `components/ui` - small reusable design system components and style tokens

## Scripts

- `npm run dev` - run locally
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint
