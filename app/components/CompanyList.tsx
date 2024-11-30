"use client";

import CompanyListItem from "./CompanyListItem";
import type { ICompany } from "../types/company";
import { LoadingIndicator } from "./LoadingIndicator";
import { useCompaniesApi } from "../hooks/useCompaniesApi";
import { ErrorAlert } from "./ErrorAlert";

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
      <p className="text-gray-500 py-4">
        No companies available at the moment.
      </p>
    );
  }

  // Happy path: render the list of companies
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {companies.map((company: ICompany) => (
        <CompanyListItem key={company.companyId} company={company} />
      ))}
    </ul>
  );
}
