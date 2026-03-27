# CLAUDE.md - AI Assistant Development Guide

> 🤖 Read this file first before working on this project. It tells you exactly how to approach development.

## Project Overview

V3 Fathom Call Sync is a personal productivity dashboard that connects Fathom (meeting recordings) to Google Drive, automatically syncing transcripts with smart duplicate detection and status monitoring. Built with Next.js 15, Supabase, and TypeScript for a single user who wants their Fathom transcripts organized in Google Drive.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Server Actions
- **Database:** Supabase (PostgreSQL + Auth + Realtime)
- **APIs:** Google Drive, Fathom, n8n, Pipedream, Google Sheets
- **Deployment:** Vercel

## Folder Structure & Conventions


app/
├── (dashboard)/           # Authenticated pages (layout.tsx has auth)
│   ├── dashboard/         # Main dashboard page
│   ├── connections/       # OAuth connection management
│   ├── history/          # Sync history and logs
│   └── settings/         # User preferences
├── auth/                 # OAuth callbacks only
├── api/                  # API routes (REST endpoints)
└── globals.css           # Global styles with Tailwind

components/               # Reusable UI components
├── ui/                   # Base components (buttons, modals, etc.)
└── dashboard/            # Page-specific components

lib/                      # Business logic & utilities
├── fathom.ts            # Fathom API client
├── google-drive.ts      # Google Drive API client
├── sync.ts              # Core sync logic
└── utils.ts             # General utilities

actions/                  # Server Actions only
├── auth-actions.ts      # OAuth and connection actions
└── sync-actions.ts      # Sync trigger and management actions

db/                       # Database access layer only
├── queries.ts           # SELECT queries
├── mutations.ts         # INSERT/UPDATE/DELETE
└── client.ts            # Supabase client setup

types/                    # TypeScript definitions
supabase/                # Database schema and migrations


## Coding Conventions

1. **TypeScript Strict Mode:** All files must be fully typed, no `any` types
2. **Server Components by Default:** Use `'use client'` only when necessary
3. **Data Access:** All database queries must go through `/db` layer functions
4. **Business Logic:** Complex logic goes in `/lib`, not in components
5. **No Secrets in Client:** Never import server env vars in client components
6. **Server Actions:** All mutations use Server Actions, not API routes
7. **Error Boundaries:** Wrap async operations in try/catch with proper error types

## Current State: Generated Scaffold

✅ **What's built:**
- Complete Next.js 15 project structure with TypeScript
- Supabase integration with 7-table data model
- Route stubs for all 9 pages from sitemap
- OAuth callback handlers (empty)
- API endpoint stubs for sync operations
- Basic Tailwind CSS setup with dashboard layout
- Integration client stubs for all 4 APIs

❌ **What's NOT built yet:**
- No OAuth implementations
- No API client logic
- No sync functionality
- No UI components beyond basic layout
- No data fetching or mutations

## What to Build Next: v1 Features

### Priority 1: Core Authentication
1. **OAuth for Fathom API** - Implement authorization flow and token storage
2. **OAuth for Google Drive** - Implement authorization flow and token storage
3. **Connection Management UI** - Dashboard to show connected services and re-auth

### Priority 2: Sync Engine
4. **Fathom API Client** - Fetch all available transcripts with metadata
5. **Google Drive Upload** - Upload transcripts as text files to designated folder
6. **Duplicate Detection** - Skip files already uploaded (compare by Fathom transcript ID)

### Priority 3: Dashboard
7. **Sync Status Dashboard** - Show successful uploads, failures, total count
8. **Manual Sync Trigger** - Big button to start sync process on-demand
9. **Sync History** - Log of all sync operations with timestamps and results

## Never Touch Rules

🚫 **DO NOT modify these without explicit instruction:**
- `.env` files (only add new variables if requested)
- Migration files in `supabase/migrations/` (only create new ones)
- RLS policies without security review
- `package.json` dependencies (ask before adding new ones)

## How to Work on This Project

### Before You Start
1. **Always read this file first** - Check for updates to conventions or current state
2. **Check the roadmap** - Understand what you're building toward
3. **Review technical debt** - Know what shortcuts exist

### Development Workflow
1. **Start small** - Pick one feature from the v1 list
2. **Test as you go** - Run `npm run dev` and test in browser
3. **Build before committing** - Run `npm run build` to catch TypeScript errors
4. **Commit often** - Use conventional commits: `feat:`, `fix:`, `refactor:`
5. **Document debt** - If you take shortcuts, add them to TECHNICAL_DEBT.md

### When Building Features
- **Start with types** - Define TypeScript interfaces first
- **Build data layer** - Add database queries in `/db`
- **Add business logic** - Core functionality in `/lib`
- **Create Server Actions** - For mutations and complex operations
- **Build UI components** - Start with basic functionality, polish later
- **Add error handling** - Proper try/catch and user feedback

### Common Patterns
typescript
// Server Action pattern
export async function triggerSync() {
  try {
    const result = await syncTranscripts();
    revalidatePath('/dashboard');
    return { success: true, data: result };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error: error.message };
  }
}

// Database query pattern
export async function getUserConnections(userId: string) {
  const { data, error } = await supabase
    .from('oauth_connections')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}


### Questions to Ask
- "Does this follow the folder structure?"
- "Is this the right place for this code?"
- "Have I handled errors properly?"
- "Is this component server or client, and why?"
- "Did I update the types if I changed data structures?"

Remember: This is Claude Code development - we're building fast with AI assistance, but still following good patterns for maintainable code.