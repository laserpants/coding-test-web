export default function LoadingIndicator() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="flex items-center justify-center py-8"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"></div>
    </div>
  );
}
