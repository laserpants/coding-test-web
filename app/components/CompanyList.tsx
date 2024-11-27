import { ICompany } from './company.types';
import Company from './Company';
import { apiFetch } from '../api';

export default async function CompanyList() {
  const { data: companies }: { data: ICompany[] } = await apiFetch('companies');

  return (
    <>
      {companies.map(({ companyId, ...company }) => 
        <Company key={companyId} {...company} />
      )}
    </>
  );
}
