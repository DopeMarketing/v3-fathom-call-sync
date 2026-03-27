BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_created_at_idx ON users(created_at);

-- Create oauth_connections table
CREATE TABLE oauth_connections (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_type text NOT NULL CHECK (service_type IN ('fathom', 'google_drive', 'n8n', 'pipedream', 'google_sheets')),
    access_token text NOT NULL,
    refresh_token text,
    expires_at timestamptz,
    scope text,
    account_info jsonb,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX oauth_connections_user_service_idx ON oauth_connections(user_id, service_type);
CREATE INDEX oauth_connections_expires_at_idx ON oauth_connections(expires_at);
CREATE INDEX oauth_connections_user_id_idx ON oauth_connections(user_id);
CREATE INDEX oauth_connections_created_at_idx ON oauth_connections(created_at);

-- Create sync_configurations table
CREATE TABLE sync_configurations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    google_drive_folder_id text,
    google_drive_folder_path text,
    duplicate_handling text NOT NULL CHECK (duplicate_handling IN ('skip', 'overwrite', 'rename')),
    auto_sync_enabled boolean NOT NULL DEFAULT false,
    sync_frequency_hours integer,
    file_naming_pattern text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX sync_configurations_user_id_idx ON sync_configurations(user_id);
CREATE INDEX sync_configurations_created_at_idx ON sync_configurations(created_at);

-- Create fathom_transcripts table
CREATE TABLE fathom_transcripts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_id text NOT NULL,
    title text NOT NULL,
    meeting_date timestamptz NOT NULL,
    duration_minutes integer,
    participant_count integer,
    content_hash text,
    metadata jsonb,
    last_fetched_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX fathom_transcripts_user_fathom_idx ON fathom_transcripts(user_id, fathom_id);
CREATE INDEX fathom_transcripts_meeting_date_idx ON fathom_transcripts(meeting_date);
CREATE INDEX fathom_transcripts_content_hash_idx ON fathom_transcripts(content_hash);
CREATE INDEX fathom_transcripts_user_id_idx ON fathom_transcripts(user_id);
CREATE INDEX fathom_transcripts_created_at_idx ON fathom_transcripts(created_at);

-- Create sync_jobs table
CREATE TABLE sync_jobs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status text NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    trigger_type text NOT NULL CHECK (trigger_type IN ('manual', 'automatic', 'webhook')),
    total_transcripts integer,
    processed_count integer NOT NULL DEFAULT 0,
    success_count integer NOT NULL DEFAULT 0,
    failed_count integer NOT NULL DEFAULT 0,
    skipped_count integer NOT NULL DEFAULT 0,
    error_message text,
    started_at timestamptz,
    completed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sync_jobs_user_status_idx ON sync_jobs(user_id, status);
CREATE INDEX sync_jobs_created_at_idx ON sync_jobs(created_at DESC);
CREATE INDEX sync_jobs_user_id_idx ON sync_jobs(user_id);

-- Create sync_job_items table
CREATE TABLE sync_job_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sync_job_id uuid NOT NULL REFERENCES sync_jobs(id) ON DELETE CASCADE,
    fathom_transcript_id uuid NOT NULL REFERENCES fathom_transcripts(id) ON DELETE CASCADE,
    status text NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'skipped')),
    google_drive_file_id text,
    upload_filename text,
    error_message text,
    processed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sync_job_items_sync_job_id_idx ON sync_job_items(sync_job_id);
CREATE INDEX sync_job_items_fathom_transcript_id_idx ON sync_job_items(fathom_transcript_id);
CREATE INDEX sync_job_items_status_idx ON sync_job_items(status);
CREATE INDEX sync_job_items_user_id_idx ON sync_job_items(user_id);
CREATE INDEX sync_job_items_created_at_idx ON sync_job_items(created_at);

-- Create uploaded_files table
CREATE TABLE uploaded_files (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fathom_transcript_id uuid NOT NULL REFERENCES fathom_transcripts(id) ON DELETE CASCADE,
    google_drive_file_id text NOT NULL,
    filename text NOT NULL,
    content_hash text NOT NULL,
    file_size_bytes bigint,
    folder_id text NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    uploaded_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX uploaded_files_user_drive_file_idx ON uploaded_files(user_id, google_drive_file_id);
CREATE INDEX uploaded_files_content_hash_idx ON uploaded_files(content_hash);
CREATE INDEX uploaded_files_fathom_transcript_id_idx ON uploaded_files(fathom_transcript_id);
CREATE INDEX uploaded_files_user_id_idx ON uploaded_files(user_id);
CREATE INDEX uploaded_files_created_at_idx ON uploaded_files(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fathom_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_job_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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