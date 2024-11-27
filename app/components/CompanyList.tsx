import type { ICompany } from './company.types';
import Company from './Company';
import { apiFetch } from '../api';

export default async function CompanyList() {
  const { data: companies }: { data: ICompany[] } = await apiFetch('companies');

  return (
    <div>
      {companies.map((company) => 
        <Company key={company.companyId} {...company} />
      )}
    </div>
  );
}
