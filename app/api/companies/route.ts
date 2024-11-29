import { NextResponse } from "next/server";
import mockCompanies from "../../data/companies";

/*
 * GET /api/companies
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  // Filter companies if a "search" query parameter is provided
  const filteredCompanies = search
    ? mockCompanies.filter((company) =>
        company.companyName.toLowerCase().includes(search.toLowerCase()),
      )
    : mockCompanies;

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * limit,
    page * limit,
  );

  return NextResponse.json({
    data: paginatedCompanies,
    total: filteredCompanies.length,
    page,
    limit,
  });
}
