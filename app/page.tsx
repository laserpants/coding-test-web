import { Inter } from "next/font/google";
import { Suspense } from 'react';
import CompanyList from './components/CompanyList';
import LoadingIndicator from './components/LoadingIndicator';

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<LoadingIndicator />}>
        <h2 className={inter.className}>Quartr</h2>
        <p className={inter.className}>Trending companies</p>
        <CompanyList />
      </Suspense>
    </main>
  );
}
