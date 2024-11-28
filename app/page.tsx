import CompanyList from "./components/CompanyList";

export default function HomePage() {
  return (
    <main>
      <div className="bg-white max-w-2xl mx-auto p-4">
        <h3 className="text-lg font-normal text-gray-400 pb-5">Quartr</h3>
        <h2 className="text-lg font-medium text-gray-900">
          Trending companies
        </h2>
        <CompanyList />
      </div>
    </main>
  );
}
