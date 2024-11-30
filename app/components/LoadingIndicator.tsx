export default function LoadingIndicator() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="flex justify-center items-center py-8"
    >
      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
}
