'use client';

import CompanyListItem from './CompanyListItem';
import LoadingIndicator from './LoadingIndicator';
import ErrorAlert from './ErrorAlert';
import { useCompaniesApi } from '../hooks/useCompaniesApi';
import type { ICompany } from '../types/company';

export default function CompanyList() {
  const { companies, isLoading, error, retry } = useCompaniesApi();

  // Loading indicator while data is being fetched
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Error message if fetch fails
  if (error) {
    return <ErrorAlert error={error} onRetry={retry} />;
  }

  // Show a message when no companies are available
  if (companies.length === 0) {
    return (
      <p className="py-4 text-gray-500">
        No companies available at the moment.
      </p>
    );
  }

  // Happy path: render the list of companies
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {companies.map(
        ({ companyId, description, companyName, iconUrl }: ICompany) => (
          <CompanyListItem
            key={companyId}
            companyName={companyName}
            description={description}
            iconUrl={iconUrl}
          />
        ),
      )}
    </ul>
  );
}
