# V3 Fathom Call Sync

> Seamlessly sync all your Fathom transcripts to Google Drive with one click

A dashboard-heavy tool that connects your Fathom account to Google Drive, automatically fetching and uploading all meeting transcripts as organized text files. Perfect for personal knowledge management and backup.

## What this does

- **One-click OAuth** for both Fathom and Google Drive APIs
- **Bulk transcript export** that fetches all available transcripts
- **Smart duplicate detection** to avoid re-uploading existing files
- **Real-time sync dashboard** showing upload progress and status
- **Manual sync triggers** for on-demand exports

## Who this is for

Personal users who want to:
- Back up Fathom transcripts to Google Drive
- Organize meeting notes in their preferred file structure
- Access transcripts offline or share them easily
- Integrate transcripts into broader knowledge management workflows

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **Integrations**: Google Drive API, Fathom API, n8n, Pipedream, Google Sheets API

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Google Cloud Console project with Drive API enabled
- Fathom account with API access

## Local Setup

1. **Clone and install**
   bash
   git clone <repository-url>
   cd v3-fathom-call-sync
   npm install
   

2. **Environment variables**
   bash
   cp .env.example .env.local
   # Fill in all required values (see table below)
   

3. **Start Supabase**
   bash
   npx supabase start
   

4. **Run development server**
   bash
   npm run dev
   

5. **Open** [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server operations | Yes |
| `GOOGLE_DRIVE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_DRIVE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `FATHOM_CLIENT_ID` | Fathom API client ID | Yes |
| `FATHOM_CLIENT_SECRET` | Fathom API client secret | Yes |
| `NEXTAUTH_SECRET` | Random string for session encryption | Yes |
| `NEXTAUTH_URL` | Your app's URL (http://localhost:3000 for dev) | Yes |

## Database Setup

The database schema is automatically applied when you run `npx supabase start`. It includes:

- `users` - User accounts and profiles
- `oauth_connections` - Stored OAuth tokens for external services
- `sync_configurations` - User sync preferences and settings
- `fathom_transcripts` - Cached transcript metadata from Fathom
- `sync_jobs` - Background sync job tracking
- `sync_job_items` - Individual file upload tracking
- `uploaded_files` - Record of successfully uploaded files

## Deploy to Vercel

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

## Project Structure


src/
├── app/                 # Next.js 15 App Router
│   ├── (auth)/         # Authentication pages
│   ├── dashboard/      # Main dashboard
│   ├── api/           # API routes
│   └── globals.css    # Global styles
├── components/         # Reusable UI components
├── lib/               # Utilities and configurations
├── db/                # Database access layer
├── actions/           # Server actions
└── types/             # TypeScript type definitions


## Key Features

- **OAuth Authentication**: Secure token storage for both APIs
- **Bulk Export**: Efficiently handles large transcript collections
- **Duplicate Detection**: Smart file comparison prevents duplicates
- **Status Dashboard**: Real-time progress tracking
- **Manual Triggers**: On-demand sync capabilities

## Contributing

This is a personal project, but contributions are welcome! Please read `CLAUDE.md` for development guidelines.