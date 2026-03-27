# CLAUDE.md — V3 Fathom Call Sync Development Brief

## Project Overview

V3 Fathom Call Sync is a personal productivity tool that syncs Fathom meeting transcripts to Google Drive with OAuth authentication and smart duplicate detection. This is a dashboard-heavy application built for personal use with potential for automation workflow integration.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Integrations**: Google Drive API, Fathom API, n8n, Pipedream, Google Sheets
- **Deployment**: Vercel

## Folder Structure


app/
├── (auth)/                 # Authentication pages and callbacks
├── api/                    # API routes for sync operations
├── dashboard/              # Main dashboard and settings pages
├── connections/            # OAuth connection management
├── history/               # Sync job history and logs
└── settings/              # User preferences and configuration

components/
├── ui/                    # Shadcn/ui components (Button, Card, etc.)
├── dashboard/             # Dashboard-specific components
├── auth/                  # Authentication forms and flows
└── sync/                  # Sync status and controls

lib/
├── auth.ts               # NextAuth configuration
├── supabase.ts          # Supabase client setup
├── google-drive.ts      # Google Drive API wrapper
├── fathom.ts            # Fathom API integration
├── sync-engine.ts       # Core sync logic and orchestration
└── utils.ts             # General utilities

db/
├── queries.ts           # Database queries (SELECT only)
├── mutations.ts         # Database mutations (INSERT/UPDATE/DELETE)
└── types.ts             # Database type definitions

actions/
├── auth.ts              # Authentication server actions
├── sync.ts              # Sync operation server actions
└── connections.ts       # OAuth connection server actions

supabase/
├── migrations/          # Database migration files
├── config.toml         # Supabase configuration
└── seed.sql            # Development seed data


## Coding Conventions

- **TypeScript**: Strict mode enabled, no `any` types
- **React**: Server Components by default, Client Components only when needed
- **Data Access**: All database queries in `/db` directory only
- **Business Logic**: Core logic in `/lib`, server actions in `/actions`
- **Security**: No API keys or secrets in client components
- **Styling**: Tailwind CSS with consistent design system
- **Error Handling**: Structured error responses with user-friendly messages

## Current State: Scaffold Complete

This project has been scaffolded with:

✅ **Database Schema**: 7 tables with RLS policies
- `users`, `oauth_connections`, `sync_configurations`
- `fathom_transcripts`, `sync_jobs`, `sync_job_items`, `uploaded_files`

✅ **Route Structure**: 9 pages from sitemap
- Dashboard, connections, history, settings, auth callbacks, API endpoints

✅ **Integration Stubs**: Ready for Google Drive, Fathom, n8n, Pipedream

✅ **Documentation**: Complete README, roadmap, technical debt tracking

## What to Build Next: V1 Features

### Priority 1: Core Authentication
1. **OAuth Flow Setup** - Google Drive and Fathom API authentication
2. **Token Management** - Secure storage and refresh handling
3. **Connection Status UI** - Dashboard showing connected services

### Priority 2: Sync Engine
1. **Fathom API Integration** - Fetch transcript list and content
2. **Google Drive Upload** - Create folder structure and upload files
3. **Duplicate Detection** - Smart handling of existing files
4. **Manual Sync Trigger** - One-click sync button with progress

### Priority 3: Dashboard Experience
1. **Sync Status Display** - Real-time progress and results
2. **Transcript Management** - View available and uploaded transcripts
3. **Basic Error Handling** - User-friendly error messages

## Never Touch Rules

🚫 **Environment Files**: Never commit `.env*` files or expose secrets

🚫 **Migration Files**: Don't edit existing migrations without explicit instruction

🚫 **RLS Policies**: Don't modify Row Level Security without security review

🚫 **Production Data**: Never use real API keys or production data in development

## How to Work on This Project

### Before Every Session
1. **Read this file** - Always start here for context
2. **Check current branch** - Ensure you're on the right branch
3. **Review recent commits** - Understand what changed recently

### Development Workflow
1. **Small commits** - Commit working features incrementally
2. **Test before commit** - Always run `npm run build` to check for errors
3. **Conventional commits** - Use format: `feat:`, `fix:`, `docs:`, `refactor:`
4. **Document debt** - Add technical shortcuts to `TECHNICAL_DEBT.md`

### Integration Development
1. **Start with stubs** - Get basic API connections working first
2. **Test with real data** - Use actual Fathom/Google Drive accounts
3. **Handle rate limits** - Implement proper API throttling
4. **Error scenarios** - Test network failures, auth expiry, etc.

### Security Checklist
- OAuth tokens stored in database, not client
- API calls only from server components or API routes
- Input validation on all forms
- Proper error handling without exposing internals

## Database Schema Notes

- `users` table uses Supabase Auth integration
- `oauth_connections` stores encrypted refresh tokens
- `sync_jobs` tracks background processes with status
- `sync_job_items` provides granular upload tracking
- All tables have proper RLS policies for user isolation

## API Integration Patterns

- Use environment variables for all API credentials
- Implement exponential backoff for API retries
- Cache frequently accessed data (transcript metadata)
- Log API calls for debugging (but not sensitive data)

## Testing Strategy

- Manual testing with real integrations during development
- Unit tests for core sync logic
- Integration tests for API connections
- End-to-end testing for complete sync workflows

This is a living document - update it as the project evolves!