# V3 Fathom Call Sync — Roadmap

> These are Claude Code hours — time working with AI assistance, not traditional development hours. A developer working alone would multiply these by 3-5x.

## Total estimated: 87 Claude Code hours

## v1 — Ship it

### One-click OAuth authentication (~8 hours)
Implement secure OAuth flows for both Fathom API and Google Drive API with token storage, refresh logic, and connection status indicators.

### Bulk transcript export (~12 hours)
Build the core sync engine that fetches all available Fathom transcripts and uploads them as organized text files to a designated Google Drive folder.

### Basic sync status dashboard (~6 hours)
Create a real-time dashboard showing successful uploads, failed transfers, total transcript count, and recent sync history with progress indicators.

### Manual sync trigger button (~4 hours)
Implement on-demand sync functionality with background job processing, user notifications, and cancellation capabilities.

### Smart duplicate detection and handling (~8 hours)
Build intelligent file comparison logic that avoids re-uploading existing transcripts while handling modified files appropriately.

## Roadmap — Planned

### Automated scheduled syncing (~6 hours)
Implement background job scheduling for daily/weekly automatic syncing with user-configurable intervals and timezone handling.

### Google Sheets integration (~8 hours)
Create a master index spreadsheet with transcript metadata including date, duration, participants, and direct file links for easy organization.

## Idea Board — Exploring

### n8n workflow template generator (~10 hours)
Build a system that creates ready-to-use n8n automation workflows for advanced users who want custom processing pipelines.

### Transcript preprocessing options (~12 hours)
Add intelligent text processing features like removing filler words, formatting improvements, and extracting action items before upload.

### Multi-folder organization system (~8 hours)
Implement automatic sorting of transcripts by date, meeting type, or custom tags into separate Drive folders with configurable rules.

### AI-powered meeting insights (~15 hours)
Integrate AI to generate meeting summaries, extract key decisions, and identify action items from transcripts before uploading.

### Slack integration for notifications (~5 hours)
Send sync completion notifications and transcript summaries directly to designated Slack channels or DMs.

### Advanced search and filtering (~8 hours)
Build a powerful search interface that allows finding transcripts by content, participants, date ranges, or custom metadata.

### Transcript versioning system (~6 hours)
Track changes to transcripts over time and maintain version history for edited or updated meeting records.

### Custom webhook integration (~4 hours)
Allow users to configure custom webhooks that trigger when new transcripts are synced or processed.

## Integration work

- Google Drive API — 6 hours to fully implement
- Fathom API — 5 hours to fully implement
- Google Sheets API — 4 hours to fully implement
- n8n workflows — 8 hours to fully implement
- Pipedream connectors — 6 hours to fully implement