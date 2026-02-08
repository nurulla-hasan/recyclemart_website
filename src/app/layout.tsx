import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./[locale]/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import UserProvider from "@/context/UserContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Recycle Mart - Buy & Sell Everything in Bangladesh",
    template: "%s | Recycle Mart",
  },
  description:
    "Recycle Mart is Bangladesh's most trusted online marketplace. Buy and sell used electronics, vehicles, property, home appliances, and more. Safe, fast, and easy local trading.",
  keywords: [
    "Recycle Mart",
    "Online Marketplace",
    "Buy and Sell",
    "Bangladesh",
    "Used Electronics",
    "Second hand cars",
    "Property for sale",
    "Dhaka",
    "Chittagong",
    "Sylhet",
  ],
  authors: [{ name: "SmartEdge Technologies" }],
  creator: "SmartEdge Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recyclemart.bd",
    title: "Recycle Mart - Buy & Sell Everything in Bangladesh",
    description:
      "Join millions of users on Recycle Mart to buy and sell used goods, find jobs, or rent properties in Bangladesh.",
    siteName: "Recycle Mart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recycle Mart - Buy & Sell Everything in Bangladesh",
    description:
      "Bangladesh's trusted marketplace for buying and selling everything.",
    creator: "@recyclemartbd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${righteous.variable} antialiased max-w-480 mx-auto`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
