"use client";

import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { ArrowUpRight, ArrowDown, Menu, X, Send, Code2, Check, Plus } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { motion, MotionConfig, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { WebsitePreview, TelegramPreview, ManagerPreview } from "@/components/project-previews";
import { ChatWidget } from "@/components/chat-widget";
import { projects, siteConfig, type Project } from "@/data/projects";

type ContactProps = { onContact: () => void };
export function Logo() { return <span className="logo">ant<span>o</span>dev</span>; }
function scrollHome(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
}
function HomeLogo({ onNavigate }: { onNavigate?: () => void }) {
  return <a href="/#home" aria-label="antodev — главная" onClick={event => {
    scrollHome(event);
    onNavigate?.();
  }}><Logo/></a>;
}
function Reveal({children,className=""}:{children:ReactNode;className?:string}) {
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.55,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
export function Navbar({onContact, portfolioPage = false}:ContactProps & {portfolioPage?:boolean}) {
  const [menu,setMenu]=useState(false);const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>24);const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenu(false);};scroll();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("keydown",key);return()=>{window.removeEventListener("scroll",scroll);window.removeEventListener("keydown",key);};},[]);
  return <header className={"navbar"+(scrolled?" scrolled":"")}><div className="container nav-inner"><HomeLogo onNavigate={()=>setMenu(false)}/><nav className={menu?"nav-links is-open":"nav-links"} aria-label="Основная навигация">{[["Главная","/#home"],["Услуги","/#services"],["Портфолио","/portfolio"],["Обо мне","/#about"]].map(([name,href])=><a href={href} key={href} aria-current={portfolioPage && href==="/portfolio" ? "page" : undefined} onClick={event=>{setMenu(false);if(href==="/#home")scrollHome(event);}}>{name}</a>)}</nav><button onClick={()=>{setMenu(false);onContact();}} className="button button-small nav-cta">Обсудить проект <ArrowUpRight size={16}/></button><button className="menu-toggle" aria-label={menu?"Закрыть меню":"Открыть меню"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>;
}
export function Hero({onContact}:ContactProps) {
  const reduced=useReducedMotion();const px=useMotionValue(0);const x=useSpring(px,{stiffness:80,damping:24});
  return <><section className="hero container" onPointerMove={e=>{if(reduced||e.pointerType!=="mouse"||!window.matchMedia("(min-width: 1025px)").matches)return;const b=e.currentTarget.getBoundingClientRect();px.set(((e.clientX-b.left)/b.width-.5)*9);}} onPointerLeave={()=>{px.set(0);}}>
  <div className="hero-copy"><div className="eyebrow"><span className="tiny-line"/> НЕЗАВИСИМЫЙ РАЗРАБОТЧИК</div><h1>Telegram-боты<br/><span>и сайты</span></h1><p>Разрабатываю под задачу — от простых сервисов<br className="desktop-break"/> до проектов с интеграциями и автоматизацией.</p><div className="hero-actions"><a className="button" href="#portfolio">Посмотреть работы <ArrowUpRight size={18}/></a><button className="button button-outline" onClick={onContact}>Обсудить проект</button></div><div className="hero-stack"><span>Python</span><i/><span>aiogram</span><i/><span>Next.js</span><i/><span>React</span></div></div>
  <div className="hero-art"><div className="portrait-halo"/><div className="hero-orbit"/><motion.div className="hero-portrait" style={{x}}><Portrait/></motion.div><div className="floating telegram-mark"><Send size={36} fill="currentColor"/></div><div className="floating code-badge"><Code2 size={23}/><span>aiogram 3 <small> / Python</small></span></div><div className="person-label">Антон <span> / developer</span></div></div></section><div className="container hero-bottom"><a href="#services"><ArrowDown size={15}/> Чуть ниже — о работе</a><span>Код. Детали. Результат.</span></div></>;
}
export function Services() {
  return <section id="services" className="section container"><Reveal><div className="section-heading"><div><div className="eyebrow">01 / ЧТО Я ДЕЛАЮ</div><h2>Услуги</h2></div><p>Два направления.<br/>Одинаковое внимание к деталям.</p></div><div className="service-grid"><article className="service-card"><div className="service-top"><Send className="service-icon"/><span>01</span></div><h3>Telegram-боты</h3><p>От первого сообщения до нужного действия.</p><div className="tags"><span>Заявки и запись</span><span>API и базы данных</span><span>Google Sheets</span><span>Оплата и автоматизация</span></div><div className="service-visual telegram-service"><TelegramPreview compact/></div></article><article className="service-card"><div className="service-top"><Code2 className="service-icon"/><span>02</span></div><h3>Сайты</h3><p>Продуманный интерфейс на любом экране.</p><div className="tags"><span>Лендинги и портфолио</span><span>Адаптивная вёрстка</span><span>Анимации</span><span>Формы и интерфейсы</span></div><div className="service-visual website-service"><WebsitePreview compact/><span className="responsive-label"><Check size={12}/> Desktop · Tablet · Mobile</span></div></article></div></Reveal></section>;
}
function Details({project}:{project:Project}) {return <details className="project-details"><summary>Подробнее <Plus size={15}/></summary><ul>{project.features.map(f=><li key={f}><Check size={14}/>{f}</li>)}</ul></details>}
export function WebsiteProjectCard({project}:{project:Project}) {
  return <article className="project-card website-project"><a className="website-project-visual" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={"Открыть проект: "+project.title}><WebsitePreview image={project.previewImage} alt={project.previewAlt || project.title} url={project.url}/><span className="preview-open"><ArrowUpRight size={23}/></span></a><div className="project-info"><div className="project-copy"><div className="eyebrow">{project.subtitle}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></div><div className="project-actions"><a className="button button-outline" href={project.url} target="_blank" rel="noopener noreferrer">Открыть сайт <ArrowUpRight size={16}/></a><Details project={project}/></div></div></article>;
}
export function TelegramProjectCard({project}:{project:Project}) {
  return <article className="project-card telegram-project"><div className="telegram-project-visual"><div className="visual-grid"/><TelegramPreview/><ManagerPreview/><span className="bot-preview-caption">Один диалог — весь процесс.</span></div><div className="project-info"><div className="project-copy"><div className="eyebrow">{project.subtitle}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-features">{project.features.slice(0,4).map(f=><span key={f}><Check size={13}/>{f}</span>)}</div><div className="tags">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></div><div className="project-actions"><a className="button button-outline" href={project.url} target="_blank" rel="noopener noreferrer">Попробовать бота <ArrowUpRight size={16}/></a><Details project={project}/></div></div></article>;
}
export function Portfolio({ full = false }: { full?: boolean }) {
  // The homepage stays bounded even as the complete collection grows.
  const visibleProjects = full ? projects : projects.filter(p=>p.featured).slice(0,2);
  return <section id="portfolio" className={"section portfolio-section"+(full?" portfolio-full":"")}><div className="container">
    {!full && <Reveal><div className="section-heading"><div><div className="eyebrow">02 / ИЗБРАННЫЕ РАБОТЫ</div><h2>Портфолио</h2></div><p>То, что можно посмотреть<br/>и попробовать.</p></div></Reveal>}
    {(["website","telegram"] as const).map(kind=>{
      const group=visibleProjects.filter(p=>p.kind===kind);
      if(!group.length)return null;
      return <div className="portfolio-group" key={kind}><Reveal><div className="portfolio-category">{full?<h2>{kind==="website"?"Сайты":"Telegram-боты"}</h2>:<h3>{kind==="website"?"Сайты":"Telegram-боты"}</h3>}<span>{String(group.length).padStart(2,"0")}</span><div/></div></Reveal><div className="project-list">{group.map(p=><Reveal key={p.id}>{kind==="website"?<WebsiteProjectCard project={p}/>:<TelegramProjectCard project={p}/>}</Reveal>)}</div></div>;
    })}
    {!full && <div className="portfolio-more"><a className="button button-outline" href="/portfolio">Все проекты <ArrowUpRight size={18}/></a></div>}
  </div></section>;
}
export function PortfolioPage() {
  const [contactOpen,setContactOpen]=useState(false);
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">Перейти к содержимому</a><div id="home"/><Navbar portfolioPage onContact={()=>setContactOpen(true)}/><main id="main"><section className="container portfolio-intro"><Link href="/" className="back-home">← На главную</Link><div className="eyebrow">ANTODEV / ПРОЕКТЫ</div><h1>Портфолио<span>.</span></h1><p>Сайты и Telegram-боты.<br/>От интерфейса до логики внутри.</p></section><Portfolio full/><ContactCTA onContact={()=>setContactOpen(true)}/></main><Footer/><ChatWidget open={contactOpen} onOpenChange={setContactOpen}/></MotionConfig>;
}
export function WorkProcess() {
  const steps=[["Обсуждаем задачу","Что нужно сделать и как это должно работать."],["Предлагаю решение","Определяем подход, сроки и объём работы."],["Разрабатываю","Показываю промежуточный результат."],["Тестируем и запускаем","Проверяем сценарии и выпускаем проект."]];
  return <section className="section container process-section"><Reveal><div className="section-heading"><div><div className="eyebrow">03 / ОТ ЗАДАЧИ К ЗАПУСКУ</div><h2>Как я работаю</h2></div></div><ol className="process-grid">{steps.map(([title,description],i)=><li key={title}><div className="step-line"><span>{String(i+1).padStart(2,"0")}</span><i/></div><h3>{title}</h3><p>{description}</p></li>)}</ol></Reveal></section>;
}
export function About() {
  return <section id="about" className="section container about-section"><Reveal className="about-grid"><div className="about-heading"><div className="eyebrow">04 / ЗА ЭТИМ САЙТОМ</div><h2>Обо мне</h2><div className="about-signature"><Logo/><span>На связи —<br/>от задачи до запуска.</span></div></div><div className="about-copy"><h3>Привет, я Антон<span>.</span></h3><p>Занимаюсь разработкой Telegram-ботов и сайтов. Работаю с Python, aiogram и современным веб-стеком.</p><p>Берусь как за небольшие задачи, так и за проекты с API, базами данных, интеграциями и собственной логикой.</p><div className="stack-label">ИНСТРУМЕНТЫ, С КОТОРЫМИ РАБОТАЮ</div><div className="tags stack-tags">{["Python","aiogram 3","SQLite","PostgreSQL","REST API","Google API","Next.js","React","TypeScript","Tailwind CSS","Motion"].map(s=><span key={s}>{s}</span>)}</div></div></Reveal></section>;
}
export function ContactCTA({onContact}:ContactProps) {
  return <section id="contact" className="container cta-section"><Reveal><div className="cta-panel"><div className="cta-glow"/><div><div className="eyebrow">ОТ ИДЕИ — К ПЕРВОЙ СТРОКЕ КОДА</div><h2>Есть задача?<br/><span>Давай обсудим.</span></h2><p>Опиши, что нужно сделать — я посмотрю<br className="desktop-break"/> и предложу вариант реализации.</p><button className="button" onClick={onContact}>Обсудить проект <ArrowUpRight size={18}/></button></div><a className="cta-plane" href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" aria-label="Написать Антону в Telegram"><Send size={85} strokeWidth={1.2}/></a><span className="cta-contact">@antodevel</span></div></Reveal></section>;
}
export function Footer() {return <footer className="container footer"><HomeLogo/><span>© {new Date().getFullYear()} Антон. Сделано с вниманием к деталям.</span><a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight size={14}/></a></footer>}
export function PortfolioSite() {
  const [contactOpen,setContactOpen]=useState(false);const onContact=()=>setContactOpen(true);
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">Перейти к содержимому</a><div id="home"/><Navbar onContact={onContact}/><main id="main"><Hero onContact={onContact}/><Services/><Portfolio/><WorkProcess/><About/><ContactCTA onContact={onContact}/></main><Footer/><ChatWidget open={contactOpen} onOpenChange={setContactOpen}/></MotionConfig>;
}
