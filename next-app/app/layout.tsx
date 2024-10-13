import type { Metadata } from "next";
import type { Viewport } from 'next';
import localFont from "next/font/local";
import ".././styles/globals.css";

const museoSans = localFont({
  src: ".././fonts/Museo/MuseoSansCyrl-100.ttf",
  variable: "--font-museo-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  userScalable: false
}

import Link from 'next/link';
// import Image from 'next/image';

const items = [
  { id: 1, title: "Новости", rout: "/news" },
  { id: 2, title: "Командa", rout: "/team" },
  { id: 3, title: "Матчи", rout: "/image.png" },
  { id: 4, title: "Магазин", rout: "/shop" },
  { id: 5, title: "О Клубе", rout: "/about" },
  { id: 6, title: "Профиль", rout: "/image.png" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={museoSans.variable}>
      <body className={`bg-black text-white ${museoSans.className} flex flex-col overflow-x-hidden`}>
          <header className="bg-black pb-4 min-h-max sticky top-0 left-0 w-full z-10">
              <Link key='0' href='/' className='container'>
                  <img src="/kokocgroup_logo_horizontal_black_background.jpg" alt="logo" width={300} height={100}/>
              </Link>
              <div className='menu flex flex-wrap gap-y-2'>
                {items.map((item) => (
                    <Link className='button' key={item.id} href={item.rout}>{item.title}</Link>
                  ))}
              </div>
          </header>
          <main className="flex-1">
              {children}
          </main>
          <footer className="grid grid-cols-2 p-4">
          {[["+7-800-555-35-35","youremail@mail.com","Адрес: Ханты-Мансийский автономный округ — Югра, г Ханты-Мансийск, ул Анны Коньковой, д 1"].map((item) => (
            <p className="text-sm m-2">{item}</p>
          ))]}
          </footer>
      </body>
    </html>
  );
}