export function parseMT103(text: string) {
  const data: any = {};

  const lines = text.split('\n');
  lines.forEach(line => {
    if (line.includes('TRN:')) data.TRN = line.split('TRN:')[1].trim();
    else if (line.includes('COVERAGE TYPE:')) data.coverageType = line.split('COVERAGE TYPE:')[1].trim();
    else if (line.includes('MESSAGE TYPE:')) data.messageType = line.split('MESSAGE TYPE:')[1].trim();
    else if (line.includes('AMOUNT:')) data.amount = line.split('AMOUNT:')[1].trim();
    else if (line.includes('CURRENCY:')) data.currency = line.split('CURRENCY:')[1].trim();
    else if (line.includes('STATUS:')) data.status = line.split('STATUS:')[1].trim();
    else if (line.includes('BIC SENDER:')) data.bicSender = line.split('BIC SENDER:')[1].trim();
    else if (line.includes('SENDER NAME:')) data.senderName = line.split('SENDER NAME:')[1].trim();
    else if (line.includes('BIC RECEIVER:')) data.bicReceiver = line.split('BIC RECEIVER:')[1].trim();
    else if (line.includes('BENEFICIARY NAME:')) data.beneficiaryName = line.split('BENEFICIARY NAME:')[1].trim();
    else if (line.includes('NETWORK DELIVERY STATUS:')) data.networkDeliveryStatus = line.split('NETWORK DELIVERY STATUS:')[1].trim();
    else if (line.includes('PRIORITY / DELIVERY:')) data.priorityDelivery = line.split('PRIORITY / DELIVERY:')[1].trim();
    else if (line.includes('MESSAGE INPUT REFERENCE:')) data.messageInputReference = line.split('MESSAGE INPUT REFERENCE:')[1].trim();
    else if (line.includes('UETR CODE:')) data.uetrCode = line.split('UETR CODE:')[1].trim();
    else if (line.includes('SWIFT INPUT:')) data.swiftInput = line.split('SWIFT INPUT:')[1].trim();
    else if (line.includes('SENDER:')) data.sender = line.split('SENDER:')[1].trim();
    else if (line.includes('RECEIVER:')) data.receiver = line.split('RECEIVER:')[1].trim();
  });

  return data;
}
