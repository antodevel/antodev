import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "Портфолио — antodev",
  description: "Сайты и Telegram-боты Антона: проекты, интерфейсы, технологии и ссылки на работающие версии.",
};

export default function Page() {
  return <PortfolioPage />;
}
