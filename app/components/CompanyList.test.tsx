import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import CompanyList from "./CompanyList";
import { useCompaniesApi } from "../hooks/useCompaniesApi";

vi.mock("../hooks/useCompaniesApi", () => ({
  useCompaniesApi: vi.fn(),
}));

const mockUseCompaniesApi = useCompaniesApi as ReturnType<typeof vi.fn>;

describe("CompanyList", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the loading state", async () => {
    mockUseCompaniesApi.mockReturnValue({
      companies: [],
      isLoading: true,
      error: null,
      retry: vi.fn(),
    });

    render(<CompanyList />);

    expect(screen.getByRole("status")).toBeDefined();
  });

  it("renders a message when no companies are available", async () => {
    mockUseCompaniesApi.mockReturnValue({
      companies: [],
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(<CompanyList />);

    expect(screen.queryByRole("list")).toBeNull();
    expect(
      screen.getByText(/no companies available at the moment/i)
    ).toBeDefined();
  });

  it("renders the list of companies", async () => {
    mockUseCompaniesApi.mockReturnValue({
      companies: [
        {
          companyName: "Company A",
          companyId: 1,
        },
        {
          companyName: "Company B",
          companyId: 2,
        },
      ],
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(<CompanyList />);

    const listItems = screen.getAllByRole("listitem");

    expect(screen.getByRole("list")).toBeDefined();
    expect(listItems).toHaveLength(2);
    expect(screen.getByText("Company A")).toBeDefined();
  });

  it("handles fetch failure gracefully", async () => {
    mockUseCompaniesApi.mockReturnValue({
      companies: [],
      isLoading: false,
      error: "Failed to fetch companies.",
      retry: vi.fn(),
    });

    render(<CompanyList />);

    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByText(/failed to fetch companies/i)).toBeDefined();
  });
});
