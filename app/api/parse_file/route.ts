import { NextResponse } from 'next/server';
import path from 'path';
import { parsePDF, parseDOCX, listFiles } from '@/utils/parseFile';

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = "/home/clientuser/uploads/";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const filePath = path.join(UPLOAD_DIR, fileName);
    const fileType = path.extname(fileName);

    let parsedData;
    if (fileType === '.pdf') {
      parsedData = await parsePDF(filePath);
    } else if (fileType === '.docx') {
      parsedData = await parseDOCX(filePath);
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const files = listFiles(UPLOAD_DIR);
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
