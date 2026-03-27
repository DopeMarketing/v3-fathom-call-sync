import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
});

interface SheetData {
  spreadsheetId: string;
  range: string;
  values: any[][];
}

interface SheetResponse {
  spreadsheetId: string;
  updatedCells: number;
  updatedRows: number;
}

export async function appendRows(
  sheetData: SheetData
): Promise<SheetResponse> {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetData.spreadsheetId,
      range: sheetData.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: sheetData.values
      }
    });
    return response.data as SheetResponse;
  } catch (error) {
    throw new Error(`Failed to append rows: ${error}`);
  }
}

export async function getSheetData(
  spreadsheetId: string,
  range: string
): Promise<any[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
    return response.data.values || [];
  } catch (error) {
    throw new Error(`Failed to get sheet data: ${error}`);
  }
}