export function ErrorAlert<T>({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => T;
}) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative flex items-center justify-between"
      role="alert"
      aria-live="polite"
    >
      <div>
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
