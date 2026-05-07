# ChainLib Frontend

Next.js frontend application for the ChainLib e-library platform.

## Features

- **Browse Books**: Discover and search through published books
- **Publish Books**: Authors can upload and publish their content
- **My Library**: Readers can access their purchased books
- **Wallet Integration**: Connect Stellar wallets for transactions
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── books/
│   │   └── page.tsx      # Browse books
│   ├── publish/
│   │   └── page.tsx      # Publish books
│   └── library/
│       └── page.tsx      # User's library
├── components/           # Reusable components
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions
```

## Pages

- **Home** (`/`) - Landing page with features and stats
- **Browse Books** (`/books`) - Search and filter available books
- **Publish** (`/publish`) - Form for authors to publish books
- **My Library** (`/library`) - User's purchased books

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Type Check**: `npx tsc --noEmit`

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=your_contract_id
```

## Deployment

The app can be deployed to Vercel, Netlify, or any platform that supports Next.js.

```bash
npm run build
npm start
```