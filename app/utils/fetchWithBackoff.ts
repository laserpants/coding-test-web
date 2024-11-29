interface IFetchFunction<T> {
  (): Promise<T>;
}

/**
 * Retries a given fetch function with exponential backoff.
 *
 * @param fetchFunction - The function to execute and retry on failure.
 * @param retries - Maximum number of retries
 * @param delay - Initial delay in milliseconds
 *
 * @returns The result of the fetch function if successful.
 * @throws The last error encountered if all retries fail.
 */
export async function fetchWithBackoff<T>(
  fetchFunction: IFetchFunction<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  try {
    return await fetchFunction();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return fetchWithBackoff(fetchFunction, retries - 1, delay * 2);
  }
}
