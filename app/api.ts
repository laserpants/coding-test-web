const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}/api/${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}
