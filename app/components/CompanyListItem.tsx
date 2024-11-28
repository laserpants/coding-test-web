"use client";

import type { ICompany } from "../types/company";

export default function CompanyListItem({
  iconUrl,
  companyName,
  description,
}: ICompany) {
  return (
    <div className="flex items-center py-4">
      <img
        src={iconUrl ?? "https://placehold.co/50"}
        alt={companyName}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex-1">
        <p className="text-base font-semibold text-gray-800">{companyName}</p>
        <div className="text-sm text-gray-500 line-clamp-2">
          <p className="text-sm text-gray-500 ">{description}</p>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-gray-400 ml-2 cursor-pointer"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
