import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const UPLOAD_DIR = "/home/clientuser/uploads/";

export async function parsePDF(filePath: string): Promise<any> {
  const dataBuffer = readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return extractMT103Data(data.text);
}

export async function parseDOCX(filePath: string): Promise<any> {
  const { value } = await mammoth.extractRawText({ path: filePath });
  return extractMT103Data(value);
}

function extractMT103Data(content: string): any {
  const data: any = {};

  const lines = content.split('\n');
  lines.forEach(line => {
    if (line.includes('TRANSACTION NUMBER:')) data.transaction_number = line.split('TRANSACTION NUMBER:')[1].trim();
    else if (line.includes('AMOUNT:')) data.amount = line.split('AMOUNT:')[1].trim();
    else if (line.includes('CURRENCY:')) data.currency = line.split('CURRENCY:')[1].trim();
    else if (line.includes('STATUS:')) data.status = line.split('STATUS:')[1].trim();
    else if (line.includes('BIC SENDER:')) data.bic_sender = line.split('BIC SENDER:')[1].trim();
    else if (line.includes('SENDER NAME:')) data.sender_name = line.split('SENDER NAME:')[1].trim();
    else if (line.includes('BENEFICIARY NAME:')) data.beneficiary_name = line.split('BENEFICIARY NAME:')[1].trim();
  });

  return data;
}

export function listFiles(directoryPath: string): string[] {
  return readdirSync(directoryPath).filter(file => ['.pdf', '.docx'].includes(path.extname(file)));
}
