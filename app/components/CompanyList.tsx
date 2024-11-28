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
          onClick={retry}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {companies.map((company: ICompany) => (
        <CompanyListItem key={company.companyId} {...company} />
      ))}
    </div>
  );
}
