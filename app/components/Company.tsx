'use client';

import type { ICompany } from './company.types';

export default function Company({ companyName }: ICompany) {
  return (
    <>
      {companyName}
    </>
  );
}
