# V3 Fathom Call Sync

Sync your Fathom meeting transcripts directly to Google Drive with one-click automation.

## What This Does

V3 Fathom Call Sync is a personal productivity tool that automatically exports all your Fathom meeting transcripts to a designated Google Drive folder. Perfect for individuals who want to maintain a centralized archive of their meeting notes with smart duplicate detection and bulk export capabilities.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Integrations**: Google Drive API, Fathom API, n8n, Pipedream, Google Sheets
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI (`npm install -g supabase`)
- Google Cloud Console project with Drive API enabled
- Fathom API credentials
- Git

## Local Setup

1. **Clone the repository**
   bash
   git clone <your-repo-url>
   cd v3-fathom-call-sync
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.local.example .env.local
   
   Fill in the required values (see Environment Variables section below).

4. **Start Supabase**
   bash
   supabase start
   

5. **Run database migrations**
   bash
   supabase db reset
   

6. **Start development server**
   bash
   npm run dev
   

Visit `http://localhost:3000` to see the application.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (server-side only) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `GOCSPX-xxxxx` |
| `FATHOM_CLIENT_ID` | Fathom API client ID | `fathom_xxx` |
| `FATHOM_CLIENT_SECRET` | Fathom API client secret | `fs_xxx` |
| `NEXTAUTH_URL` | Your app's URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random string for JWT signing | `openssl rand -base64 32` |

## Database Setup

The database schema includes 7 tables:
- `users` - User account information
- `oauth_connections` - Stored OAuth tokens for APIs
- `sync_configurations` - User sync preferences and settings
- `fathom_transcripts` - Cached transcript metadata from Fathom
- `sync_jobs` - Background job tracking for sync operations
- `sync_job_items` - Individual file transfer records within jobs
- `uploaded_files` - Record of successfully uploaded files to Drive

Run `supabase db reset` to create all tables with proper Row Level Security policies.

## Deploy to Vercel

1. **Connect your repository to Vercel**
   - Import your Git repository in the Vercel dashboard

2. **Add environment variables**
   - Copy all variables from your `.env.local` to Vercel's environment settings
   - Update `NEXTAUTH_URL` to your production domain

3. **Deploy**
   bash
   vercel --prod
   

## Project Structure


├── app/                    # Next.js 15 app directory
│   ├── (auth)/            # Auth-related pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── dashboard/        # Dashboard-specific components
├── lib/                   # Business logic and utilities
├── db/                    # Database access layer
├── actions/               # Server actions
├── types/                 # TypeScript type definitions
├── supabase/             # Database migrations and config
└── public/               # Static assets


## Contributing

This is a personal project, but if you're working on it:

1. Read `CLAUDE.md` first
2. Run `npm run build` before committing
3. Use conventional commit messages
4. Keep commits small and focused

For more development guidelines, see `CLAUDE.md`.

## License

MIT License - see LICENSE file for details.