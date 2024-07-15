'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [isParsed, setIsParsed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setIsParsed(false);
      setParsedData(null);
      setIsChecked(false);
    }
  };

  const handleParse = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/parse_mt103', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setParsedData(result);
    setIsParsed(true);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleConfirmConvert = () => {
    if (isChecked) {
      // Add your convert logic here
      console.log('Convert confirmed');
    }
  };

  return (
    <Card className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload MT103 File</h1>
      <form onSubmit={handleParse}>
        <Input type="file" onChange={handleFileChange} className="mb-4" />
        <Button type="submit" className="mb-4">Parse File</Button>
      </form>
      {isParsed && (
        <>
          <div>
            <h2 className="text-lg font-bold mb-2">Parsed Data</h2>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
          <div className="mt-4">
            <Checkbox onChange={handleCheckboxChange}>
              I confirm the data is correct and want to convert
            </Checkbox>
          </div>
          <Button
            className="mt-4"
            disabled={!isChecked}
            onClick={handleConfirmConvert}
          >
            Confirm Convert
          </Button>
        </>
      )}
    </Card>
  );
}
