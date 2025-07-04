/**
 * Utility functions for phone number handling
 */

/**
 * Validates if a phone number with country code is valid
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return false;
    }

    // Remove country code and check if remaining number has at least 7 digits
    const phoneNumberPart = phoneNumber.replace(/^\+\d+\s*/, '');
    const digitsOnly = phoneNumberPart.replace(/\D/g, '');

    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

/**
 * Extracts country code from a full phone number
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {string} - Country code (e.g., "+1")
 */
export const extractCountryCode = (phoneNumber) => {
    if (!phoneNumber) return '';

    const match = phoneNumber.match(/^(\+\d+)/);
    return match ? match[1] : '';
};

/**
 * Extracts phone number without country code
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {string} - Phone number without country code
 */
export const extractPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    return phoneNumber.replace(/^\+\d+\s*/, '');
};

/**
 * Formats phone number for display
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    const countryCode = extractCountryCode(phoneNumber);
    const number = extractPhoneNumber(phoneNumber);

    if (!countryCode || !number) return phoneNumber;

    return `${countryCode} ${number}`;
};

/**
 * Sanitizes phone number for API submission
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {string} - Sanitized phone number
 */
export const sanitizePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    // Remove all non-digit characters except the + at the beginning
    return phoneNumber.replace(/(?!^\+)\D/g, '');
};