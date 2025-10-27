import { parsePhoneNumber, isValidPhoneNumber, CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { popularCountryCodes } from '@shared/schema';

export function cleanPhoneNumber(input: string): string {
  return input.replace(/[^\d+]/g, '');
}

export function formatPhoneNumber(
  phoneNumber: string,
  defaultCountryCode: string
): { formatted: string; isValid: boolean; international: string } {
  try {
    const cleaned = cleanPhoneNumber(phoneNumber);
    
    if (!cleaned) {
      return { formatted: '', isValid: false, international: '' };
    }

    let numberToValidate = cleaned;
    if (!cleaned.startsWith('+')) {
      numberToValidate = defaultCountryCode + cleaned;
    }

    const countryISOCode = getCountryCodeFromDialCode(defaultCountryCode);
    
    if (countryISOCode && isValidPhoneNumber(numberToValidate, countryISOCode as CountryCode)) {
      const parsed = parsePhoneNumber(numberToValidate, countryISOCode as CountryCode);
      return {
        formatted: parsed.formatInternational(),
        isValid: true,
        international: parsed.format('E.164'),
      };
    }

    if (isValidPhoneNumber(numberToValidate)) {
      const parsed = parsePhoneNumber(numberToValidate);
      return {
        formatted: parsed.formatInternational(),
        isValid: true,
        international: parsed.format('E.164'),
      };
    }

    return {
      formatted: numberToValidate,
      isValid: false,
      international: numberToValidate,
    };
  } catch (error) {
    return {
      formatted: phoneNumber,
      isValid: false,
      international: phoneNumber,
    };
  }
}

function getCountryCodeFromDialCode(dialCode: string): string | null {
  const country = popularCountryCodes.find(c => c.dialCode === dialCode);
  if (country) {
    return country.code;
  }

  try {
    const allCountries = getCountries();
    for (const countryCode of allCountries) {
      const callingCode = `+${getCountryCallingCode(countryCode)}`;
      if (callingCode === dialCode) {
        return countryCode;
      }
    }
  } catch (error) {
    console.error('Error getting country code:', error);
  }

  return null;
}

export function detectPhoneNumberFromClipboard(text: string): string | null {
  const cleaned = cleanPhoneNumber(text);
  
  if (cleaned.length >= 10 && cleaned.length <= 15) {
    return text;
  }
  
  const phonePattern = /(\+?\d[\d\s\-()]{7,})/g;
  const matches = text.match(phonePattern);
  
  if (matches && matches.length > 0) {
    return matches[0];
  }
  
  return null;
}
