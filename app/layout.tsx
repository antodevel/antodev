import type { Metadata } from "next";
import "./globals.css";
import "./dark-theme.css";
export const metadata: Metadata = { title: "antodev — Telegram-боты и сайты", description: "Привет, я Антон. Разрабатываю Telegram-ботов и сайты на Python, aiogram, Next.js. Работы, подход и связь со мной.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ru"><body>{children}</body></html>}
