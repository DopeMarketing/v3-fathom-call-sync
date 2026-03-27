# V3 Fathom Call Sync — Roadmap

> These are Claude Code hours — time working with AI assistance, not traditional development hours. A developer working alone would multiply these by 3-5x.

## Total estimated: 127 Claude Code hours

## v1 — Ship it

### One-click OAuth Authentication (~8 hours)
Implement secure OAuth flows for both Fathom API and Google Drive API with token storage and refresh handling.

### Bulk Transcript Export (~12 hours)
Build the core sync engine that fetches all available Fathom transcripts and uploads them as organized text files to Google Drive.

### Basic Sync Status Dashboard (~6 hours)
Create a clean dashboard showing successful uploads, failed transfers, total transcript count, and recent sync activity.

### Manual Sync Trigger Button (~3 hours)
Add a prominent sync button that allows users to manually trigger the export process and see real-time progress.

### Smart Duplicate Detection (~5 hours)
Implement logic to compare existing Drive files with Fathom transcripts to avoid re-uploading duplicates on subsequent syncs.

## Roadmap — Planned

### Automated Scheduled Syncing (~8 hours)
Add cron-based scheduling system that automatically syncs new Fathom transcripts daily or weekly based on user preferences.

### Google Sheets Master Index (~10 hours)
Create a comprehensive spreadsheet that catalogs all transcripts with metadata like date, duration, participants, and direct file links.

## Idea Board — Exploring

### n8n Workflow Template Generator (~12 hours)
Build a tool that generates ready-to-use n8n workflow templates for users who want advanced automation capabilities.

### Transcript Preprocessing Engine (~15 hours)
Add intelligent text processing to remove filler words, improve formatting, and extract action items before uploading to Drive.

### Multi-folder Organization System (~8 hours)
Implement automatic sorting that organizes transcripts into separate Drive folders based on date, meeting type, or custom tags.

### Advanced Search and Filtering (~10 hours)
Create a powerful search interface that allows users to find specific transcripts by keywords, participants, or date ranges.

### Transcript Analytics Dashboard (~12 hours)
Provide insights on meeting patterns, speaking time analysis, and trending topics across all synced transcripts.

### Real-time Sync Notifications (~6 hours)
Implement push notifications or email alerts when new transcripts are successfully synced to Google Drive.

### Backup and Recovery System (~8 hours)
Add functionality to backup sync configurations and restore transcripts if they're accidentally deleted from Drive.

### Team Collaboration Features (~14 hours)
Extend the tool to support team accounts where multiple users can sync transcripts to shared Google Drive folders.

## Integration work

- Google Drive API — 8 hours to fully implement
- Fathom API — 6 hours to fully implement
- Google Sheets API — 4 hours to fully implement
- n8n Webhooks — 3 hours to fully implement
- Pipedream Integration — 2 hours to fully implement