import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
});

export interface SheetData {
  range: string;
  values: string[][];
}

export interface UpdateValuesOptions {
  spreadsheetId: string;
  range: string;
  values: string[][];
  valueInputOption?: 'RAW' | 'USER_ENTERED';
}

export interface GetValuesOptions {
  spreadsheetId: string;
  range: string;
}

export async function getValues(options: GetValuesOptions): Promise<string[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: options.spreadsheetId,
      range: options.range
    });
    return response.data.values || [];
  } catch (error) {
    throw new Error(`Failed to get sheet values: ${error}`);
  }
}

export async function updateValues(options: UpdateValuesOptions): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: options.spreadsheetId,
      range: options.range,
      valueInputOption: options.valueInputOption || 'USER_ENTERED',
      requestBody: {
        values: options.values
      }
    });
  } catch (error) {
    throw new Error(`Failed to update sheet values: ${error}`);
  }
}