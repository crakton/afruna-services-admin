import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ProvidersContextProvider } from "@/contexts/ProvidersContextProvider";
import { BookingsContextProvider } from "@/contexts/BookingsContextProvider";
import { CustomersContextProvider } from "@/contexts/CustomersContextProvider.";
import TransactionsContextProvider from "@/contexts/TransactionsContextProvider";
import { ServicesContextProvider } from "@/contexts/ServicesContextProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afruna",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersContextProvider>
      <BookingsContextProvider>
        <CustomersContextProvider>
          <TransactionsContextProvider>
            <ServicesContextProvider>
              <html lang="en">
                <body className={''}>{children}</body>
              </html>
            </ServicesContextProvider>
          </TransactionsContextProvider>
        </CustomersContextProvider>
      </BookingsContextProvider>
    </ProvidersContextProvider>
  );
}
