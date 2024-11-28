"use client";

import type { ICompany } from "../types/company";

export default function Company({ companyName }: ICompany) {
  return <li>{companyName}</li>;
}
