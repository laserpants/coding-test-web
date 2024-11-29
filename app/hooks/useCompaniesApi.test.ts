import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { useCompaniesApi } from "./useCompaniesApi";
import { fetchWithBackoff } from "../utils/fetchWithBackoff";

vi.mock("../utils/fetchWithBackoff");

const mockFetchWithBackoff = fetchWithBackoff as ReturnType<typeof vi.fn>;

describe("useCompaniesApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch companies successfully", async () => {
    const mockCompanies = [
      { companyId: 1, companyName: "Company A" },
      { companyId: 2, companyName: "Company B" },
    ];

    mockFetchWithBackoff.mockResolvedValueOnce({ data: mockCompanies });

    const { result } = renderHook(() => useCompaniesApi());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.companies).toEqual(mockCompanies);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch failure gracefully", async () => {
    mockFetchWithBackoff.mockRejectedValueOnce(
      new Error("Failed to fetch companies."),
    );

    const { result } = renderHook(() => useCompaniesApi());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.companies).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch companies.");
  });

  it("should retry and succeed on subsequent attempts", async () => {
    const mockCompanies = [
      { companyId: 1, companyName: "Company A" },
      { companyId: 2, companyName: "Company B" },
    ];

    // Simulate failure on first attempt and success on retry
    mockFetchWithBackoff
      .mockRejectedValueOnce(new Error("Failed to fetch companies."))
      .mockResolvedValueOnce({ data: mockCompanies });

    const { result } = renderHook(() => useCompaniesApi());

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.companies).toEqual(mockCompanies);
    expect(result.current.isLoading).toBe(false);
  });
});
