import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { store } from "./redux/store";
import { Providers } from "./redux/provider";
import SideBar from "./_components/sidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"flex m-4 h-full"}>
        <Providers store={store}>
          <SideBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
