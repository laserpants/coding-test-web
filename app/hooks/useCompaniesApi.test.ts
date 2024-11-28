import { renderHook } from "@testing-library/react";
import { useCompaniesApi } from "./useCompaniesApi";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { waitFor } from "@testing-library/react";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("useCompaniesApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and returns list of companies", async () => {
    // Mock a successful API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          { companyId: 1, companyName: "Company A", companyCountry: "US" },
          { companyId: 2, companyName: "Company B", companyCountry: "UK" },
        ],
      }),
    } as Response);

    // Render the hook
    const { result } = renderHook(() => useCompaniesApi());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.companies).toEqual([
      { companyId: 1, companyName: "Company A", companyCountry: "US" },
      { companyId: 2, companyName: "Company B", companyCountry: "UK" },
    ]);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch failure", async () => {
    // Mock fetch to reject with an error
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Failed to fetch"),
    );

    // Render the hook
    const { result } = renderHook(() => useCompaniesApi());

    await waitFor(() => expect(result.current.error).toBe("Failed to fetch"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.companies).toEqual([]);
  });
});
