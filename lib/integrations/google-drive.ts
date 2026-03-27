import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_DRIVE_API_KEY
});

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
}

export interface UploadFileParams {
  name: string;
  parents?: string[];
  media: {
    mimeType: string;
    body: Buffer | string;
  };
}

export async function listFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      q: folderId ? `'${folderId}' in parents` : undefined,
      fields: 'files(id,name,mimeType,createdTime)'
    });
    return response.data.files as DriveFile[];
  } catch (error) {
    throw new Error(`Failed to list files: ${error}`);
  }
}

export async function uploadFile(params: UploadFileParams): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: params.name,
        parents: params.parents
      },
      media: params.media,
      fields: 'id,name,mimeType,createdTime'
    });
    return response.data as DriveFile;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
}