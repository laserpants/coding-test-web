"use client";

import CompanyListItem from "./CompanyListItem";
import { ICompany } from "../types/company";
import LoadingIndicator from "./LoadingIndicator";
import { useCompaniesApi } from "../hooks/useCompaniesApi";

export default function CompanyList() {
  const { companies, isLoading, error, retry } = useCompaniesApi();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative flex items-center justify-between">
        <div>
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
        <button
          role="button"
          onClick={retry}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <p className="text-gray-500 py-4">
        No companies available at the moment.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200" role="list">
      {companies.map((company: ICompany) => (
        <CompanyListItem key={company.companyId} {...company} />
      ))}
    </ul>
  );
}
