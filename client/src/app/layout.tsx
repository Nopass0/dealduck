import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DealDuck - Steam Trading',
  description: 'Steam trading platform with authentication',
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
