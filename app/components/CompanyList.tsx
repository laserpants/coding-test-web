'use client';

import { useState, useEffect } from 'react';
import type { ICompany } from './company.types';
import Company from './Company';
import LoadingIndicator from './LoadingIndicator';

export default function CompanyList() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies.');
        }
        const { data: companies } = await response.json();
        setCompanies(companies);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (isLoading) {
    return (
      <LoadingIndicator />
    );
  }

  if (error) {
    return (
      <>
        Error
      </>
    );
  }

  return (
    <div>
      {companies.map((company) => 
        <Company key={company.companyId} {...company} />
      )}
    </div>
  );
}
