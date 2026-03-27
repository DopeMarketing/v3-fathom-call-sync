# V3 Fathom Call Sync

> A tool that connects Fathom to Google Drive and syncs all transcripts automatically.

## What this does

V3 Fathom Call Sync is a personal productivity tool that bridges Fathom (meeting recording platform) with Google Drive. It automatically fetches all your Fathom transcripts and uploads them as organized text files to your Google Drive, with smart duplicate detection and a clean dashboard to monitor sync status.

**Built for:** Personal use by individuals who use Fathom for meeting recordings and want transcripts stored in Google Drive for easy access and organization.

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Supabase (PostgreSQL + Auth)
- **Integrations:** Google Drive API, Fathom API, n8n, Pipedream, Google Sheets
- **Deployment:** Vercel
- **Database:** PostgreSQL via Supabase

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase CLI
- Google Cloud Console project with Drive API enabled
- Fathom account with API access

## Local Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v3-fathom-call-sync
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up Supabase**
   bash
   supabase start
   supabase db reset
   

4. **Configure environment variables**
   Copy `.env.example` to `.env.local` and fill in the values:
   bash
   cp .env.example .env.local
   

5. **Start development server**
   bash
   npm run dev
   

   Visit `http://localhost:3000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server-side operations | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID for Drive API access | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `FATHOM_CLIENT_ID` | Fathom API client ID | Yes |
| `FATHOM_CLIENT_SECRET` | Fathom API client secret | Yes |
| `NEXTAUTH_URL` | Base URL for OAuth callbacks (http://localhost:3000 in dev) | Yes |
| `NEXTAUTH_SECRET` | Random secret for NextAuth.js | Yes |
| `N8N_WEBHOOK_URL` | Optional n8n webhook URL for workflow triggers | No |
| `PIPEDREAM_API_KEY` | Optional Pipedream API key for workflow integration | No |

## Database Setup

The database schema is automatically applied when you run `supabase db reset`. The schema includes:

- `users` - User profiles and settings
- `oauth_connections` - Stored OAuth tokens for integrations
- `sync_configurations` - User sync preferences and settings
- `fathom_transcripts` - Cached Fathom transcript metadata
- `sync_jobs` - Sync operation tracking
- `sync_job_items` - Individual file sync status
- `uploaded_files` - Google Drive upload tracking

## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npm run build
   vercel
   

2. **Set environment variables in Vercel dashboard**
   - Add all environment variables from the table above
   - Update `NEXTAUTH_URL` to your production domain

3. **Update OAuth redirect URIs**
   - Google Console: Add `https://yourdomain.com/auth/google/callback`
   - Fathom Dashboard: Add `https://yourdomain.com/auth/fathom/callback`

## Project Structure


├── app/                    # Next.js 15 app directory
│   ├── (dashboard)/       # Dashboard pages (authenticated)
│   ├── auth/              # OAuth callback handlers
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Business logic and utilities
├── actions/              # Server actions
├── db/                   # Database queries and utilities
├── types/                # TypeScript type definitions
├── supabase/             # Database migrations and config
└── public/               # Static assets


## Getting Help

This is a personal project scaffold. Check the following files for development guidance:

- `CLAUDE.md` - AI assistant development guide
- `TECHNICAL_DEBT.md` - Known shortcuts and improvements needed
- `ROADMAP.md` - Feature development plan
- `CHANGELOG.md` - Version history