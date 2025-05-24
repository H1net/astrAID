export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
        <h2 className="text-xl font-semibold text-accent">Loading...</h2>
        <p className="text-gray-600 mt-2">Please wait while we fetch the content.</p>
      </div>
    </div>
  );
}
