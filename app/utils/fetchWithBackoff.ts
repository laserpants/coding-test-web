interface FetchFunction {
  (): Promise<any>;
}

export async function fetchWithBackoff(
  fetchFn: FetchFunction,
  retries: number = 3,
  delay: number = 1000,
): Promise<any> {
  try {
    return await fetchFn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return fetchWithBackoff(fetchFn, retries - 1, delay * 2);
  }
}
