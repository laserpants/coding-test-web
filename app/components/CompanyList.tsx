"use client";

import CompanyListItem from "./CompanyListItem";
import { ICompany } from "../types/company";
import LoadingIndicator from "./LoadingIndicator";
import { useCompaniesApi } from "../hooks/useCompaniesApi";

export default function CompanyList() {
  const { companies, isLoading, error, retry } = useCompaniesApi();

  // Loading indicator while data is being fetched
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Error message if fetch fails
  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative flex items-center justify-between"
        role="alert"
        aria-live="polite"
      >
        <div>
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
        <button
          onClick={retry}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
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
        <CompanyListItem key={company.companyId} {...company} />
      ))}
    </ul>
  );
}
