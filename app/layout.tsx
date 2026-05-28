import type { Metadata } from "next";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitPilot",
  description: "Your AI Fitness Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <OnboardingProvider>{children}</OnboardingProvider>
      </body>
    </html>
  );
}
