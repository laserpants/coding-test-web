import { useState, useEffect } from "react";
import { ICompany } from "../types/company";

export function useCompaniesApi() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/companies");
      if (!response.ok) {
        throw new Error("Failed to fetch companies.");
      }
      const { data: companies } = await response.json();
      setCompanies(companies);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, isLoading, error, retry: fetchCompanies };
}
