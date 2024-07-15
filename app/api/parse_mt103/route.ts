import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';
import formidable from 'formidable';
import fs from 'fs';
import { parseMT103 } from '@/utils/parseMT103';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    const incomingMessage = req as unknown as IncomingMessage;
    const form = formidable({ multiples: true });

    form.parse(incomingMessage, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const file = files.file;
      const filePath = file.filepath;

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        const parsedData = parseMT103(data);
        resolve(NextResponse.json(parsedData));
      });
    });
  });
}
