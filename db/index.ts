import { createClient } from '@supabase/supabase-js';
import { User, OAuthConnection, SyncConfiguration, FathomTranscript, SyncJob, SyncJobItem, UploadedFile } from '@/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Users
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select('id, email, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, email, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// OAuth Connections
export async function getOAuthConnections(): Promise<OAuthConnection[]> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch oauth connections: ${error.message}`);
  return data || [];
}

export async function getOAuthConnectionById(id: string): Promise<OAuthConnection | null> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch oauth connection: ${error.message}`);
  return data;
}

export async function createOAuthConnection(connection: Omit<OAuthConnection, 'id' | 'created_at' | 'updated_at'>): Promise<OAuthConnection> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .insert(connection)
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create oauth connection: ${error.message}`);
  return data;
}

export async function updateOAuthConnection(id: string, updates: Partial<Omit<OAuthConnection, 'id' | 'created_at' | 'updated_at'>>): Promise<OAuthConnection> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update oauth connection: ${error.message}`);
  return data;
}

export async function deleteOAuthConnection(id: string): Promise<void> {
  const { error } = await supabase
    .from('oauth_connections')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete oauth connection: ${error.message}`);
}

// Sync Configurations
export async function getSyncConfigurations(): Promise<SyncConfiguration[]> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .select('id, user_id, google_drive_folder_id, google_drive_folder_path, duplicate_handling, auto_sync_enabled, sync_frequency_hours, file_naming_pattern, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch sync configurations: ${error.message}`);
  return data || [];
}

export async function getSyncConfigurationById(id: string): Promise<SyncConfiguration | null> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .select('id, user_id, google_drive_folder_id, google_drive_folder_path, duplicate_handling, auto_sync_enabled, sync_frequency_hours, file_naming_pattern, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync configuration: ${error.message}`);
  return data;
}

export async function createSyncConfiguration(config: Omit<SyncConfiguration, 'id' | 'created_at' | 'updated_at'>): Promise<SyncConfiguration> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .insert(config)
    .select('id, user_id, google_drive_folder_id, google_drive_folder_path, duplicate_handling, auto_sync_enabled, sync_frequency_hours, file_naming_pattern, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create sync configuration: ${error.message}`);
  return data;
}

export async function updateSyncConfiguration(id: string, updates: Partial<Omit<SyncConfiguration, 'id' | 'created_at' | 'updated_at'>>): Promise<SyncConfiguration> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, google_drive_folder_id, google_drive_folder_path, duplicate_handling, auto_sync_enabled, sync_frequency_hours, file_naming_pattern, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update sync configuration: ${error.message}`);
  return data;
}

export async function deleteSyncConfiguration(id: string): Promise<void> {
  const { error } = await supabase
    .from('sync_configurations')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete sync configuration: ${error.message}`);
}

// Fathom Transcripts
export async function getFathomTranscripts(): Promise<FathomTranscript[]> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .order('meeting_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch fathom transcripts: ${error.message}`);
  return data || [];
}

export async function getFathomTranscriptById(id: string): Promise<FathomTranscript | null> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch fathom transcript: ${error.message}`);
  return data;
}

export async function createFathomTranscript(transcript: Omit<FathomTranscript, 'id' | 'created_at'>): Promise<FathomTranscript> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .insert(transcript)
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .single();
  if (error) throw new Error(`Failed to create fathom transcript: ${error.message}`);
  return data;
}

export async function updateFathomTranscript(id: string, updates: Partial<Omit<FathomTranscript, 'id' | 'created_at'>>): Promise<FathomTranscript> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .update(updates)
    .eq('id', id)
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .single();
  if (error) throw new Error(`Failed to update fathom transcript: ${error.message}`);
  return data;
}

export async function deleteFathomTranscript(id: string): Promise<void> {
  const { error } = await supabase
    .from('fathom_transcripts')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete fathom transcript: ${error.message}`);
}

// Sync Jobs
export async function getSyncJobs(): Promise<SyncJob[]> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch sync jobs: ${error.message}`);
  return data || [];
}

export async function getSyncJobById(id: string): Promise<SyncJob | null> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync job: ${error.message}`);
  return data;
}

export async function createSyncJob(job: Omit<SyncJob, 'id' | 'created_at'>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .insert(job)
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .single();
  if (error) throw new Error(`Failed to create sync job: ${error.message}`);
  return data;
}

export async function updateSyncJob(id: string, updates: Partial<Omit<SyncJob, 'id' | 'created_at'>>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .update(updates)
    .eq('id', id)
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .single();
  if (error) throw new Error(`Failed to update sync job: ${error.message}`);
  return data;
}

export async function deleteSyncJob(id: string): Promise<void> {
  const { error } = await supabase
    .from('sync_jobs')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete sync job: ${error.message}`);
}

// Sync Job Items
export async function getSyncJobItems(): Promise<SyncJobItem[]> {
  const { data, error } = await supabase
    .from('sync_job_items')
    .select('id, user_id, sync_job_id, fathom_transcript_id, status, google_drive_file_id, upload_filename, error_message, processed_at, created_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch sync job items: ${error.message}`);
  return data || [];
}

export async function getSyncJobItemById(id: string): Promise<SyncJobItem | null> {
  const { data, error } = await supabase
    .from('sync_job_items')
    .select('id, user_id, sync_job_id, fathom_transcript_id, status, google_drive_file_id, upload_filename, error_message, processed_at, created_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync job item: ${error.message}`);
  return data;
}

export async function createSyncJobItem(item: Omit<SyncJobItem, 'id' | 'created_at'>): Promise<SyncJobItem> {
  const { data, error } = await supabase
    .from('sync_job_items')
    .insert(item)
    .select('id, user_id, sync_job_id, fathom_transcript_id, status, google_drive_file_id, upload_filename, error_message, processed_at, created_at')
    .single();
  if (error) throw new Error(`Failed to create sync job item: ${error.message}`);
  return data;
}

export async function updateSyncJobItem(id: string, updates: Partial<Omit<SyncJobItem, 'id' | 'created_at'>>): Promise<SyncJobItem> {
  const { data, error } = await supabase
    .from('sync_job_items')
    .update(updates)
    .eq('id', id)
    .select('id, user_id, sync_job_id, fathom_transcript_id, status, google_drive_file_id, upload_filename, error_message, processed_at, created_at')
    .single();
  if (error) throw new Error(`Failed to update sync job item: ${error.message}`);
  return data;
}

export async function deleteSyncJobItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('sync_job_items')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete sync job item: ${error.message}`);
}

// Uploaded Files
export async function getUploadedFiles(): Promise<UploadedFile[]> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .order('uploaded_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch uploaded files: ${error.message}`);
  return data || [];
}

export async function getUploadedFileById(id: string): Promise<UploadedFile | null> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch uploaded file: ${error.message}`);
  return data;
}

export async function createUploadedFile(file: Omit<UploadedFile, 'id' | 'created_at'>): Promise<UploadedFile> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .insert(file)
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .single();
  if (error) throw new Error(`Failed to create uploaded file: ${error.message}`);
  return data;
}

export async function updateUploadedFile(id: string, updates: Partial<Omit<UploadedFile, 'id' | 'created_at'>>): Promise<UploadedFile> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .update(updates)
    .eq('id', id)
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .single();
  if (error) throw new Error(`Failed to update uploaded file: ${error.message}`);
  return data;
}

export async function deleteUploadedFile(id: string): Promise<void> {
  const { error } = await supabase
    .from('uploaded_files')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete uploaded file: ${error.message}`);
}