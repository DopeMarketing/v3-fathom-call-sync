# V3 Fathom Call Sync — Roadmap

> These are Claude Code hours — time working with AI assistance, not traditional development hours. A developer working alone would multiply these by 3-5x.

## Total estimated: 127 Claude Code hours

## v1 — Ship it

### One-click OAuth authentication (~8 hours)
Implement secure OAuth flows for both Fathom API and Google Drive API with token storage and refresh handling.

### Bulk transcript export (~12 hours)
Fetch all available Fathom transcripts and upload them as organized text files to designated Google Drive folder.

### Basic sync status dashboard (~6 hours)
Create dashboard showing successful uploads, failed transfers, total transcript count, and sync history.

### Manual sync trigger button (~4 hours)
Build on-demand sync functionality with real-time progress indicators and job status tracking.

### Smart duplicate detection (~8 hours)
Implement intelligent duplicate handling to avoid re-uploading existing transcripts on subsequent syncs.

## Roadmap — Planned

### Automated scheduled syncing (~10 hours)
Add daily/weekly scheduling options to automatically keep Google Drive folder updated with new transcripts.

### Google Sheets integration (~12 hours)
Create master index spreadsheet with transcript metadata including date, duration, participants, and Drive file links.

## Idea Board — Exploring

### n8n workflow template generator (~15 hours)
Generate ready-to-use n8n automation workflows that advanced users can import and customize.

### Transcript preprocessing options (~18 hours)
Add options to remove filler words, improve formatting, or extract action items before upload.

### Multi-folder organization system (~12 hours)
Automatically sort transcripts by date, meeting type, or custom tags into separate Drive folders.

### Pipedream integration templates (~8 hours)
Pre-built Pipedream workflows for advanced automation scenarios and third-party app connections.

### Transcript search and filtering (~10 hours)
Add full-text search capabilities across all synced transcripts with advanced filtering options.

### Meeting analytics dashboard (~14 hours)
Visualize meeting patterns, participant frequency, and transcript trends over time.

### Batch processing controls (~6 hours)
Allow users to select specific date ranges or meeting types for targeted sync operations.

### Export format options (~8 hours)
Support multiple export formats including PDF, Word documents, and structured JSON for different use cases.

## Integration work

- Google Drive API — 6 hours to fully implement with folder management and file operations
- Fathom API — 8 hours to implement complete transcript fetching and metadata handling
- Google Sheets API — 5 hours to implement spreadsheet creation and data population
- n8n Integration — 4 hours to create workflow templates and API connections
- Pipedream Integration — 3 hours to build workflow templates and documentation