import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_DRIVE_API_KEY
});

interface FileUploadOptions {
  name: string;
  parents?: string[];
  mimeType?: string;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
}

export async function uploadFile(
  fileBuffer: Buffer,
  options: FileUploadOptions
): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: options.name,
        parents: options.parents
      },
      media: {
        mimeType: options.mimeType || 'application/octet-stream',
        body: fileBuffer
      }
    });
    return response.data as DriveFile;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
}

export async function listFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      q: folderId ? `'${folderId}' in parents` : undefined,
      fields: 'files(id,name,mimeType,size)'
    });
    return response.data.files as DriveFile[];
  } catch (error) {
    throw new Error(`Failed to list files: ${error}`);
  }
}