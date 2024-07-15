import sys
import os
import textract

def parse_file(file_path):
    text = textract.process(file_path).decode('utf-8')
    data = {
        "TRN": "",
        "coverageType": "",
        "messageType": "",
        "amount": "",
        "currency": "",
        "status": "",
        "bicSender": "",
        "senderName": "",
        "bicReceiver": "",
        "beneficiaryName": "",
        "networkDeliveryStatus": "",
        "priorityDelivery": "",
        "messageInputReference": "",
        "uetrCode": "",
        "swiftInput": "",
        "sender": "",
        "receiver": "",
    }
    
    lines = text.split('\n')
    for line in lines:
        if 'TRN:' in line: data['TRN'] = line.split('TRN:')[1].strip()
        elif 'COVERAGE TYPE:' in line: data['coverageType'] = line.split('COVERAGE TYPE:')[1].strip()
        elif 'MESSAGE TYPE:' in line: data['messageType'] = line.split('MESSAGE TYPE:')[1].strip()
        elif 'AMOUNT:' in line: data['amount'] = line.split('AMOUNT:')[1].strip()
        elif 'CURRENCY:' in line: data['currency'] = line.split('CURRENCY:')[1].strip()
        elif 'STATUS:' in line: data['status'] = line.split('STATUS:')[1].strip()
        elif 'BIC SENDER:' in line: data['bicSender'] = line.split('BIC SENDER:')[1].strip()
        elif 'SENDER NAME:' in line: data['senderName'] = line.split('SENDER NAME:')[1].strip()
        elif 'BIC RECEIVER:' in line: data['bicReceiver'] = line.split('BIC RECEIVER:')[1].strip()
        elif 'BENEFICIARY NAME:' in line: data['beneficiaryName'] = line.split('BENEFICIARY NAME:')[1].strip()
        elif 'NETWORK DELIVERY STATUS:' in line: data['networkDeliveryStatus'] = line.split('NETWORK DELIVERY STATUS:')[1].strip()
        elif 'PRIORITY / DELIVERY:' in line: data['priorityDelivery'] = line.split('PRIORITY / DELIVERY:')[1].strip()
        elif 'MESSAGE INPUT REFERENCE:' in line: data['messageInputReference'] = line.split('MESSAGE INPUT REFERENCE:')[1].strip()
        elif 'UETR CODE:' in line: data['uetrCode'] = line.split('UETR CODE:')[1].strip()
        elif 'SWIFT INPUT:' in line: data['swiftInput'] = line.split('SWIFT INPUT:')[1].strip()
        elif 'SENDER:' in line: data['sender'] = line.split('SENDER:')[1].strip()
        elif 'RECEIVER:' in line: data['receiver'] = line.split('RECEIVER:')[1].strip()
    
    return data

if __name__ == "__main__":
    file_path = sys.argv[1]
    if os.path.exists(file_path):
        parsed_data = parse_file(file_path)
        print(parsed_data)
    else:
        print(f"File {file_path} does not exist.")
