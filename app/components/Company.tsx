'use client';

import { ICompany } from './company.types';

export default function Company({ companyName }: ICompany) {
  return (
    <>
      {companyName}
    </>
  );
}
