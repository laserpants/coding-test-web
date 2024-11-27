/**
 * Represents an ISIN (International Securities Identification Number),
 * defined by ISO 6166. The format is a 12-character alphanumeric string:
 *
 * - 2 letters: country code (ISO 3166-1 alpha-2)
 * - 9 characters: security identifier
 * - 1 digit: checksum
 *
 * For more details, see: https://www.iso.org/standard/44866.html
 */
export type ISIN = string;

/**
 * Validates whether a given string is a valid ISIN (ISO 6166 format).
 *
 * @param isin - The ISIN string to validate.
 * @returns True if the ISIN is valid, or false otherwise.
 */
export function isValidISIN(isin: string): boolean {
  const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
  return isinRegex.test(isin);
}
