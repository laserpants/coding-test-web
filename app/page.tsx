import { Inter } from "next/font/google";
import CompanyList from './components/CompanyList';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h2 className={inter.className}>Quartr</h2>
      <p className={inter.className}>Trending companies</p>
      <CompanyList />
    </main>
  );
}
