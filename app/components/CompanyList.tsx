"use client";

import Company from "./Company";
import { ICompany } from "../types/company";
import LoadingIndicator from "./LoadingIndicator";
import { useCompaniesApi } from "../hooks/useCompaniesApi";

export default function CompanyList() {
  const { companies, isLoading, error } = useCompaniesApi();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <div>
      {companies.map((company: ICompany) => (
        <Company key={company.companyId} {...company} />
      ))}
    </div>
  );
}
