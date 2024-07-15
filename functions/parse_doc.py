import docx
import sys
import json

file_path = sys.argv[1]

doc = docx.Document(file_path)
text = '\n'.join([para.text for para in doc.paragraphs])

# Process the text as needed
data = {
    "parsed_text": text
}

print(json.dumps(data))
