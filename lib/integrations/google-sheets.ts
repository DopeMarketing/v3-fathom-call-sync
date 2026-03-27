import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
});

export interface SheetData {
  range: string;
  majorDimension: string;
  values: string[][];
}

export interface UpdateSheetParams {
  spreadsheetId: string;
  range: string;
  values: string[][];
}

export async function getSheetData(spreadsheetId: string, range: string): Promise<SheetData> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
    return {
      range: response.data.range!,
      majorDimension: response.data.majorDimension!,
      values: response.data.values || []
    };
  } catch (error) {
    throw new Error(`Failed to get sheet data: ${error}`);
  }
}

export async function updateSheetData(params: UpdateSheetParams): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: params.spreadsheetId,
      range: params.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: params.values
      }
    });
  } catch (error) {
    throw new Error(`Failed to update sheet data: ${error}`);
  }
}