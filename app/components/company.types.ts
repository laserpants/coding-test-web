import type { CountryCode } from '../types/ISO/country';
import type { Currency } from '../types/ISO/currency';
import type { ISIN } from '../types/securitiesIdNumber';

interface IEvent {
  audioUrl?: string | null;          // Optional audio URL
  reportUrl: string | null;          // Optional report URL
  pdfUrl: string | null;             // Optional PDF URL
  eventId: number;                   // Unique event identifier
  eventTitle: string;                // Event title
  eventDate: string;                 // ISO date string, e.g., '2022-10-26T08:00:00.000Z'
  qnaTimestamp: number | null;       // Q&A timestamp in seconds, or null
  fiscalPeriod: string;              // Fiscal period, e.g., 'Q3' for the third quarter
  fiscalYear: string;                // Fiscal year, e.g., '2022'
};

interface IColorSettings {
  brandColor: string;                // Hexadecimal color code, e.g., '#ffffff'
}

export interface ICompany {
  companyId: number;                 // Unique company identifier
  companyName: string;               // Company name
  companyCountry: CountryCode;       // Country code, e.g., 'NO' for Norway
  displayName: string;               // Display name for the company
  companyTicker: string;             // Ticker symbol, e.g., 'OKEA'
  infoUrl: string;                   // URL for Company information
  liveUrl: string;                   // URL for live investor data
  logoLightUrl: string;              // URL for light-mode logotype
  logoDarkUrl: string;               // URL for dark-mode logotype
  iconUrl?: string | null;           // Optional URL for icon
  description: string;               // Description of the company
  reportingCurrency: Currency;       // Reporting currency, e.g., 'NOK'
  colorSettings: IColorSettings;     // Color settings object
  events: IEvent[];                  // Array of company events
  isins?: ISIN[];                    // Optional array of ISO 6166 ISINs
}
