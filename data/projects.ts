export type Project = {
  id: string;
  featured?: boolean;
  previewImage?: string;
  previewAlt?: string;
  kind: "website" | "telegram";
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  url: string;
};

export const projects: Project[] = [
  {
    id: "ember", featured: true, previewImage: "/restaurant-preview.png", previewAlt: "Ресторанный сайт EMBER", kind: "website", title: "Ресторанный сайт", subtitle: "EMBER / ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ",
    description: "Сайт ресторана с интерактивным первым экраном, анимациями, меню и формой бронирования.",
    technologies: ["React", "TypeScript", "Адаптивная вёрстка"],
    features: ["Интерактивный hero", "Меню с категориями", "Бронирование"],
    url: "https://restaurant-demo-xi-seven.vercel.app/",
  },
  {
    id: "questionnaire", featured: true, kind: "telegram", title: "Бот для приёма заявок", subtitle: "TELEGRAM / АВТОМАТИЗАЦИЯ",
    description: "Собирает информацию шаг за шагом и передаёт готовую заявку менеджеру. Всё — в привычном чате.",
    technologies: ["Python", "aiogram 3", "FSM", "SQLite"],
    features: ["Пошаговая анкета", "Контакты и файлы", "Промокоды", "Менеджер-панель", "Статусы заявок", "Хранение данных"],
    url: "https://t.me/anton_questionnaire_bot",
  },
];

export const siteConfig = { telegram: "https://t.me/antodevel", contactEndpoint: "" };
