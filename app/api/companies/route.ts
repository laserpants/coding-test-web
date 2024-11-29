import { NextResponse } from "next/server";
import mockCompanies from "../../data/companies";

/**
 * GET /api/companies
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  // Filter companies if a "search" query parameter is provided
  const filteredCompanies = search
    ? mockCompanies.filter(({ companyName }) =>
        companyName.toLowerCase().includes(search.toLowerCase()),
      )
    : mockCompanies;

  // Paginate the response
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
