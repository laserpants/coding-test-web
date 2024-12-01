export default function ErrorAlert<T>({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => T;
}) {
  return (
    <div
      className="relative mt-4 flex items-center justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
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
          className="rounded bg-red-600 px-4 py-1 text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
