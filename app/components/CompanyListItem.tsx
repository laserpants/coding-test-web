"use client";

import Image from "next/image";

// Component to render an individual company in the list
export default function CompanyListItem({
  iconUrl = null,
  companyName,
  description,
}: {
  iconUrl?: string | null;
  companyName: string;
  description: string;
}) {
  return (
    <li role="listitem" className="flex items-center py-4">
      <Image
        src={iconUrl ?? "https://placehold.co/50/png"}
        alt={companyName}
        className="w-12 h-12"
        width="50"
        height="50"
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
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </li>
  );
}
