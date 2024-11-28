interface FetchFunction<T> {
  (): Promise<T>;
}

export async function fetchWithBackoff<T>(
  fetchFn: FetchFunction<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  try {
    return await fetchFn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return fetchWithBackoff(fetchFn, retries - 1, delay * 2);
  }
}
