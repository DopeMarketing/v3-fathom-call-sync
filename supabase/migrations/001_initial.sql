BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create oauth_connections table
CREATE TABLE oauth_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL CHECK (service_type IN ('fathom', 'google_drive', 'n8n', 'pipedream', 'google_sheets')),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    scope TEXT,
    account_info JSONB,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create sync_configurations table
CREATE TABLE sync_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    google_drive_folder_id TEXT,
    google_drive_folder_path TEXT,
    duplicate_handling TEXT NOT NULL CHECK (duplicate_handling IN ('skip', 'overwrite', 'rename')),
    auto_sync_enabled BOOLEAN NOT NULL DEFAULT false,
    sync_frequency_hours INTEGER,
    file_naming_pattern TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create fathom_transcripts table
CREATE TABLE fathom_transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_id TEXT NOT NULL,
    title TEXT NOT NULL,
    meeting_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    participant_count INTEGER,
    content_hash TEXT,
    metadata JSONB,
    last_fetched_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create sync_jobs table
CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    trigger_type TEXT NOT NULL CHECK (trigger_type IN ('manual', 'automatic', 'webhook')),
    total_transcripts INTEGER,
    processed_count INTEGER NOT NULL DEFAULT 0,
    success_count INTEGER NOT NULL DEFAULT 0,
    failed_count INTEGER NOT NULL DEFAULT 0,
    skipped_count INTEGER NOT NULL DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create sync_job_items table
CREATE TABLE sync_job_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sync_job_id UUID NOT NULL REFERENCES sync_jobs(id) ON DELETE CASCADE,
    fathom_transcript_id UUID NOT NULL REFERENCES fathom_transcripts(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'skipped')),
    google_drive_file_id TEXT,
    upload_filename TEXT,
    error_message TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create uploaded_files table
CREATE TABLE uploaded_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_transcript_id UUID NOT NULL REFERENCES fathom_transcripts(id) ON DELETE CASCADE,
    google_drive_file_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    file_size_bytes BIGINT,
    folder_id TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    uploaded_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE UNIQUE INDEX idx_oauth_connections_user_service ON oauth_connections(user_id, service_type);
CREATE INDEX idx_oauth_connections_expires_at ON oauth_connections(expires_at);
CREATE INDEX idx_oauth_connections_user_id ON oauth_connections(user_id);
CREATE INDEX idx_oauth_connections_created_at ON oauth_connections(created_at);

CREATE UNIQUE INDEX idx_sync_configurations_user_id ON sync_configurations(user_id);
CREATE INDEX idx_sync_configurations_created_at ON sync_configurations(created_at);

CREATE UNIQUE INDEX idx_fathom_transcripts_user_fathom ON fathom_transcripts(user_id, fathom_id);
CREATE INDEX idx_fathom_transcripts_meeting_date ON fathom_transcripts(meeting_date);
CREATE INDEX idx_fathom_transcripts_content_hash ON fathom_transcripts(content_hash);
CREATE INDEX idx_fathom_transcripts_user_id ON fathom_transcripts(user_id);
CREATE INDEX idx_fathom_transcripts_created_at ON fathom_transcripts(created_at);

CREATE INDEX idx_sync_jobs_user_status ON sync_jobs(user_id, status);
CREATE INDEX idx_sync_jobs_created_at_desc ON sync_jobs(created_at DESC);
CREATE INDEX idx_sync_jobs_user_id ON sync_jobs(user_id);

CREATE INDEX idx_sync_job_items_sync_job_id ON sync_job_items(sync_job_id);
CREATE INDEX idx_sync_job_items_fathom_transcript_id ON sync_job_items(fathom_transcript_id);
CREATE INDEX idx_sync_job_items_status ON sync_job_items(status);
CREATE INDEX idx_sync_job_items_user_id ON sync_job_items(user_id);
CREATE INDEX idx_sync_job_items_created_at ON sync_job_items(created_at);

CREATE UNIQUE INDEX idx_uploaded_files_user_drive_file ON uploaded_files(user_id, google_drive_file_id);
CREATE INDEX idx_uploaded_files_content_hash ON uploaded_files(content_hash);
CREATE INDEX idx_uploaded_files_fathom_transcript_id ON uploaded_files(fathom_transcript_id);
CREATE INDEX idx_uploaded_files_user_id ON uploaded_files(user_id);
CREATE INDEX idx_uploaded_files_created_at ON uploaded_files(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fathom_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_job_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON oauth_connections FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sync_configurations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON fathom_transcripts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sync_jobs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON sync_job_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON uploaded_files FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;