export function convertNumber(input: string, fromBase: string) {
  if (!input) {
    return {
      binary: '-',
      decimal: '-',
      octal: '-',
      hexadecimal: '-',
      text: '-'
    }
  }

  try {
    if (!validateInput(input, fromBase)) {
      throw new Error(`Invalid ${fromBase} input`);
    }

    let decimal: number

    if (fromBase === 'text') {
      return {
        binary: input
          .split('')
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' '),
        decimal: '-',
        octal: '-',
        hexadecimal: '-',
        text: '-'
      }
    }

    switch (fromBase) {
      case 'binary':
        decimal = parseInt(input, 2)
        break
      case 'decimal':
        decimal = parseInt(input, 10)
        break
      case 'octal':
        decimal = parseInt(input, 8)
        break
      case 'hexadecimal':
        decimal = parseInt(input, 16)
        break
      default:
        throw new Error('Invalid base')
    }

    if (isNaN(decimal)) {
      throw new Error('Invalid number')
    }

    return {
      binary: decimal.toString(2),
      decimal: decimal.toString(10),
      octal: decimal.toString(8),
      hexadecimal: decimal.toString(16).toUpperCase(),
      text: '-'
    }
  } catch (error) {
    throw error;
  }
}

export function convertBinaryToText(input: string): string {
  if (!validateInput(input, 'binaryToText')) {
    throw new Error('Invalid binary input');
  }

  const binaryArray = input.split(' ')
  return binaryArray
    .map(binary => {
      if (!/^[01]{8}$/.test(binary)) {
        throw new Error('Invalid binary input: each byte must be 8 bits long');
      }
      return String.fromCharCode(parseInt(binary, 2))
    })
    .join('')
}

export function validateInput(input: string, type: string): boolean {
  const maxLength = 1000; // Adjust this value as needed
  if (input.length > maxLength) {
    throw new Error(`Input is too long. Maximum length is ${maxLength} characters.`);
  }
  
  switch (type) {
    case 'binary':
      return /^[01]+$/.test(input);
    case 'decimal':
      return /^\d+$/.test(input);
    case 'octal':
      return /^[0-7]+$/.test(input);
    case 'hexadecimal':
      return /^[0-9A-Fa-f]+$/.test(input);
    case 'text':
    case 'binaryToText':
      return true; // We've already checked the length, so any string is valid
    default:
      return false;
  }
}

