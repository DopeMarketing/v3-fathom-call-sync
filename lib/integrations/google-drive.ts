import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_DRIVE_API_KEY
});

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
}

export interface ListFilesOptions {
  pageSize?: number;
  q?: string;
  orderBy?: string;
}

export async function listFiles(options: ListFilesOptions = {}): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      pageSize: options.pageSize || 10,
      q: options.q,
      orderBy: options.orderBy,
      fields: 'files(id,name,mimeType,size,createdTime)'
    });
    return response.data.files || [];
  } catch (error) {
    throw new Error(`Failed to list files: ${error}`);
  }
}

export async function uploadFile(name: string, content: Buffer, mimeType: string): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: { name },
      media: { mimeType, body: content }
    });
    return response.data as DriveFile;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
}