# V3 Fathom Call Sync — Claude Development Brief

## Project Overview

V3 Fathom Call Sync is a dashboard-heavy tool that connects Fathom meeting recordings to Google Drive, automatically syncing transcripts as organized text files. This is a personal productivity tool focused on seamless OAuth integration and reliable bulk data transfer.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **APIs**: Google Drive API, Fathom API, Google Sheets API
- **Deployment**: Vercel
- **Integrations**: n8n, Pipedream for advanced workflows

## Folder Structure


src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Auth callback pages
│   ├── dashboard/         # Main app dashboard
│   ├── connections/       # OAuth management
│   ├── history/          # Sync history
│   ├── settings/         # User preferences
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # Base components (shadcn/ui style)
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   └── sync/             # Sync process components
├── lib/                  # Business logic and utilities
│   ├── auth.ts           # Authentication logic
│   ├── google-drive.ts   # Google Drive integration
│   ├── fathom.ts         # Fathom API integration
│   ├── sync.ts           # Core sync logic
│   └── utils.ts          # General utilities
├── db/                   # Database access layer
│   ├── schema.ts         # Database types
│   ├── queries.ts        # Database queries
│   └── supabase.ts       # Supabase client
├── actions/              # Server Actions
│   ├── auth.ts           # Auth-related actions
│   ├── sync.ts           # Sync-related actions
│   └── connections.ts    # OAuth connection actions
└── types/                # TypeScript definitions
    ├── fathom.ts         # Fathom API types
    ├── google.ts         # Google API types
    └── database.ts       # Database types


## Coding Conventions

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Server Components by default, Client Components only when needed
- **Data Access**: Only in `/db` directory, never directly in components
- **Business Logic**: Only in `/lib` and `/actions`, never in components
- **Security**: No API keys or secrets in client components
- **Styling**: Tailwind CSS with consistent design system
- **Error Handling**: Proper error boundaries and user-friendly messages

## Current State: Scaffold

This project starts with a complete scaffold including:

✅ **Database Schema**: All 7 tables defined with proper relationships
✅ **Route Structure**: All 9 pages from sitemap with basic layouts
✅ **Integration Stubs**: Ready-to-implement API wrappers
✅ **Authentication Flow**: OAuth callback routes prepared
✅ **UI Foundation**: Tailwind setup with dashboard layout
✅ **Type Definitions**: Complete TypeScript interfaces

## What to Build Next: V1 Features

### 1. One-click OAuth authentication
- Implement OAuth flows for Fathom and Google Drive
- Secure token storage in Supabase
- Token refresh logic
- Connection status indicators

### 2. Bulk transcript export
- Fathom API integration to fetch all transcripts
- Google Drive API integration for file uploads
- Progress tracking and status updates
- Error handling for failed uploads

### 3. Basic sync status dashboard
- Real-time progress display
- Success/failure metrics
- Transcript count summaries
- Recent sync history

### 4. Manual sync trigger
- One-click sync initiation
- Background job processing
- User notification system
- Sync cancellation capability

### 5. Smart duplicate detection
- File comparison logic
- Skip existing files
- Update modified transcripts
- User notification of skipped files

## Never Touch Rules

🚫 **Never modify**:
- `.env` files without explicit instruction
- Database migration files without explicit review
- RLS policies without security review
- Supabase configuration files

🚫 **Never commit**:
- API keys or secrets
- `.env.local` files
- Personal data or test transcripts

## How to Work on This Project

### Before Starting
1. **Always read this file first** to understand current state
2. **Check TECHNICAL_DEBT.md** for known issues
3. **Review the specific feature requirements** in the roadmap

### Development Workflow
1. **Start with data layer**: Define types and database queries
2. **Build business logic**: Implement in `/lib` or `/actions`
3. **Create UI components**: Server Components first
4. **Add error handling**: User-friendly error states
5. **Test integration flows**: OAuth and API calls

### Before Committing
1. **Run build check**: `npm run build` must pass
2. **Check TypeScript**: No type errors
3. **Test core flows**: OAuth and sync processes
4. **Update documentation**: Add any new technical debt

### Commit Guidelines
- **Use conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`
- **Commit small and often**: Single feature per commit
- **Document technical debt**: Add to TECHNICAL_DEBT.md if taking shortcuts

## Integration Priority

1. **Google Drive API** - Core functionality
2. **Fathom API** - Core functionality  
3. **Google Sheets API** - Roadmap feature
4. **n8n/Pipedream** - Advanced automation features

## Key Success Metrics

- OAuth flows work seamlessly
- Bulk uploads handle 100+ transcripts
- Duplicate detection is 100% accurate
- Dashboard provides clear status visibility
- Zero data loss during sync operations