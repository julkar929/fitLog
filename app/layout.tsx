import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A gym companion app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-base text-text font-body">
        <ToastProvider>
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}