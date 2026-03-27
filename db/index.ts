import { supabase } from '@/lib/supabase';
import { User, OAuthConnection, SyncConfiguration, FathomTranscript, SyncJob, SyncJobItem, UploadedFile } from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
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
export async function getOAuthConnections(userId: string): Promise<OAuthConnection[]> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch OAuth connections: ${error.message}`);
  return data;
}

export async function getOAuthConnectionById(id: string): Promise<OAuthConnection> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch OAuth connection: ${error.message}`);
  return data;
}

export async function createOAuthConnection(connection: Omit<OAuthConnection, 'id' | 'created_at' | 'updated_at'>): Promise<OAuthConnection> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .insert([connection])
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create OAuth connection: ${error.message}`);
  return data;
}

export async function updateOAuthConnection(id: string, updates: Partial<Omit<OAuthConnection, 'id' | 'created_at' | 'updated_at'>>): Promise<OAuthConnection> {
  const { data, error } = await supabase
    .from('oauth_connections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, service_type, access_token, refresh_token, expires_at, scope, account_info, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update OAuth connection: ${error.message}`);
  return data;
}

export async function deleteOAuthConnection(id: string): Promise<void> {
  const { error } = await supabase
    .from('oauth_connections')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete OAuth connection: ${error.message}`);
}

// Sync Configurations
export async function getSyncConfiguration(userId: string): Promise<SyncConfiguration | null> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .select('id, user_id, google_drive_folder_id, google_drive_folder_path, duplicate_handling, auto_sync_enabled, sync_frequency_hours, file_naming_pattern, created_at, updated_at')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch sync configuration: ${error.message}`);
  return data;
}

export async function createSyncConfiguration(config: Omit<SyncConfiguration, 'id' | 'created_at' | 'updated_at'>): Promise<SyncConfiguration> {
  const { data, error } = await supabase
    .from('sync_configurations')
    .insert([config])
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

// Fathom Transcripts
export async function getFathomTranscripts(userId: string): Promise<FathomTranscript[]> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .eq('user_id', userId)
    .order('meeting_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch Fathom transcripts: ${error.message}`);
  return data;
}

export async function getFathomTranscriptById(id: string): Promise<FathomTranscript> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch Fathom transcript: ${error.message}`);
  return data;
}

export async function createFathomTranscript(transcript: Omit<FathomTranscript, 'id' | 'created_at'>): Promise<FathomTranscript> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .insert([transcript])
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .single();
  if (error) throw new Error(`Failed to create Fathom transcript: ${error.message}`);
  return data;
}

export async function updateFathomTranscript(id: string, updates: Partial<Omit<FathomTranscript, 'id' | 'created_at'>>): Promise<FathomTranscript> {
  const { data, error } = await supabase
    .from('fathom_transcripts')
    .update(updates)
    .eq('id', id)
    .select('id, user_id, fathom_id, title, meeting_date, duration_minutes, participant_count, content_hash, metadata, last_fetched_at, created_at')
    .single();
  if (error) throw new Error(`Failed to update Fathom transcript: ${error.message}`);
  return data;
}

// Sync Jobs
export async function getSyncJobs(userId: string): Promise<SyncJob[]> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch sync jobs: ${error.message}`);
  return data;
}

export async function getSyncJobById(id: string): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('id, user_id, status, trigger_type, total_transcripts, processed_count, success_count, failed_count, skipped_count, error_message, started_at, completed_at, created_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch sync job: ${error.message}`);
  return data;
}

export async function createSyncJob(job: Omit<SyncJob, 'id' | 'created_at'>): Promise<SyncJob> {
  const { data, error } = await supabase
    .from('sync_jobs')
    .insert([job])
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

// Uploaded Files
export async function getUploadedFiles(userId: string): Promise<UploadedFile[]> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch uploaded files: ${error.message}`);
  return data;
}

export async function getUploadedFileById(id: string): Promise<UploadedFile> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .select('id, user_id, fathom_transcript_id, google_drive_file_id, filename, content_hash, file_size_bytes, folder_id, is_active, uploaded_at, created_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch uploaded file: ${error.message}`);
  return data;
}

export async function createUploadedFile(file: Omit<UploadedFile, 'id' | 'created_at'>): Promise<UploadedFile> {
  const { data, error } = await supabase
    .from('uploaded_files')
    .insert([file])
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