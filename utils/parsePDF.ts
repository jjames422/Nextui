import pdfjsLib from 'pdfjs-dist';

export async function parsePDF(file: File): Promise<string> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = '';

        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const textContent = await page.getTextContent();
          text += textContent.items.map((item: any) => item.str).join(' ') + '\n';
        }

        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}
