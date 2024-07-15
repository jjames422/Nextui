import sys
import json

file_path = sys.argv[1]

with open(file_path, 'r') as file:
    text = file.read()

# Process the text as needed
data = {
    "parsed_text": text
}

print(json.dumps(data))
