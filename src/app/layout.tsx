import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aqtis-dental-demo.vercel.app"),
  title: "AqTis Dental Clinic — стоматология в Астане с онлайн-записью",
  description:
    "Современная стоматология в Астане: лечение, чистка, имплантация, ортодонтия и онлайн-запись 24/7.",
  openGraph: {
    title: "AqTis Dental Clinic — стоматология в Астане",
    description:
      "Лечение, чистка, имплантация, ортодонтия и онлайн-запись 24/7 в современной демо-клинике.",
    images: ["/images/dentflow-hero.png"],
    type: "website",
    locale: "ru_KZ"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
