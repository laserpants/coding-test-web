import { useState, useEffect } from "react";
import { ICompany } from "../types/company";
import { fetchWithBackoff } from "../utils/fetchWithBackoff";

interface ICompaniesApiResponse {
  data: ICompany[];
}

// Custom hook for fetching a list of companies with retry behavior
export function useCompaniesApi() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);

      // Use backoff for retries
      const { data: companies } = await fetchWithBackoff<ICompaniesApiResponse>(
        async () => {
          const response = await fetch("/api/companies");
          if (!response.ok) {
            throw new Error("Failed to fetch companies.");
          }
          return response.json();
        },
      );

      setCompanies(companies);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, isLoading, error, retry: fetchCompanies };
}
