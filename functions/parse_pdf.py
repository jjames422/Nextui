import pdfplumber
import sys
import json

file_path = sys.argv[1]

with pdfplumber.open(file_path) as pdf:
    first_page = pdf.pages[0]
    text = first_page.extract_text()

# Process the text as needed
data = {
    "parsed_text": text
}

print(json.dumps(data))
