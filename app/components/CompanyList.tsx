'use client';

import { ICompany } from './company.types';
import { useState, useEffect } from 'react';

export default function CompanyList() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const { data }: { data: ICompany[] } = await response.json();
        setCompanies(data);
        setError(null);
      } catch(err) {
        setError(err.message);
      }
    };

    fetchCompanies();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {companies.map(({ companyId, companyName }) => (
        <li key={companyId}>
          {companyName}
        </li>
      ))}
    </>
  );
}
