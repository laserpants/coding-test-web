import CompanyList from './components/CompanyList';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl bg-white p-4">
      <header>
        <p className="pb-5 text-lg font-normal text-gray-400">Quartr</p>
        <h2 className="text-lg font-medium text-gray-900">
          Trending companies
        </h2>
      </header>
      <section>
        <CompanyList />
      </section>
    </main>
  );
}
