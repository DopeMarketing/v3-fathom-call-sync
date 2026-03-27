export interface User {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface OAuthConnection {
  id: string;
  user_id: string;
  service_type: 'fathom' | 'google_drive' | 'n8n' | 'pipedream' | 'google_sheets';
  access_token: string;
  refresh_token: string | null;
  expires_at: Date | null;
  scope: string | null;
  account_info: any | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SyncConfiguration {
  id: string;
  user_id: string;
  google_drive_folder_id: string | null;
  google_drive_folder_path: string | null;
  duplicate_handling: 'skip' | 'overwrite' | 'rename';
  auto_sync_enabled: boolean;
  sync_frequency_hours: number | null;
  file_naming_pattern: string;
  created_at: Date;
  updated_at: Date;
}

export interface FathomTranscript {
  id: string;
  user_id: string;
  fathom_id: string;
  title: string;
  meeting_date: Date;
  duration_minutes: number | null;
  participant_count: number | null;
  content_hash: string | null;
  metadata: any | null;
  last_fetched_at: Date;
  created_at: Date;
}

export interface SyncJob {
  id: string;
  user_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  trigger_type: 'manual' | 'automatic' | 'webhook';
  total_transcripts: number | null;
  processed_count: number;
  success_count: number;
  failed_count: number;
  skipped_count: number;
  error_message: string | null;
  started_at: Date | null;
  completed_at: Date | null;
  created_at: Date;
}

export interface SyncJobItem {
  id: string;
  user_id: string;
  sync_job_id: string;
  fathom_transcript_id: string;
  status: 'pending' | 'success' | 'failed' | 'skipped';
  google_drive_file_id: string | null;
  upload_filename: string | null;
  error_message: string | null;
  processed_at: Date | null;
  created_at: Date;
}

export interface UploadedFile {
  id: string;
  user_id: string;
  fathom_transcript_id: string;
  google_drive_file_id: string;
  filename: string;
  content_hash: string;
  file_size_bytes: number | null;
  folder_id: string;
  is_active: boolean;
  uploaded_at: Date;
  created_at: Date;
}

export interface Database {
  users: User;
  oauth_connections: OAuthConnection;
  sync_configurations: SyncConfiguration;
  fathom_transcripts: FathomTranscript;
  sync_jobs: SyncJob;
  sync_job_items: SyncJobItem;
  uploaded_files: UploadedFile;
}