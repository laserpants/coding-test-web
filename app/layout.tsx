import "./styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Quartr",
  description: "Financial Research and Investor Relations Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
