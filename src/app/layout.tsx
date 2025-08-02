import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "0-to-1-learning-assistant",
  description: "Learning Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}