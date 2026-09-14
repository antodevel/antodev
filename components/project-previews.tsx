"use client";

import { ArrowLeft, CheckCheck, MoreHorizontal, Paperclip, Send, RotateCcw } from "lucide-react";
import { useState } from "react";

export function WebsitePreview({ compact = false, image = "/restaurant-preview.png", alt = "Сайт EMBER: меню ресторана и интерактивный первый экран с блюдами", url = "https://restaurant-demo-xi-seven.vercel.app/" }: { compact?: boolean; image?: string; alt?: string; url?: string }) {
  return <div className={compact ? "browser-preview compact" : "browser-preview"}>
    <div className="browser-toolbar"><div className="browser-dots"><i/><i/><i/></div><span>{new URL(url).hostname}</span><MoreHorizontal size={16}/></div>
    <img src={image} alt={alt} width={1265} height={712} loading="lazy"/>
  </div>;
}

export function TelegramPreview({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  return <div className={compact ? "telegram-preview compact" : "telegram-preview"}>
    <div className="telegram-header"><ArrowLeft size={17}/><span className="bot-avatar"><Send size={20}/></span><div><b>Бот для заявок</b><small>бот</small></div><MoreHorizontal size={20}/></div>
    <div className="telegram-conversation" aria-live="polite">
      <span className="chat-date">Пример диалога</span>
      <div className="bubble outgoing">/start <small>12:40 <CheckCheck size={13}/></small></div>
      <div className="bubble">Привет! Давайте создадим заявку.<br/>Это займёт пару минут.<small>12:40</small></div>
      {step >= 1 && <><div className="bubble outgoing">Создать заявку <small>12:41 <CheckCheck size={13}/></small></div><div className="bubble">Что нужно разработать?<small>12:41</small></div></>}
      {step === 2 && <><div className="bubble outgoing">Telegram-бота <small>12:41 <CheckCheck size={13}/></small></div><div className="bubble">Отлично. Дальше — описание задачи, контакты и файлы.<small>12:41</small></div></>}
      <button className="bot-action" onClick={()=>setStep((step+1)%3)}>{step===0?"Создать заявку":step===1?"Telegram-бота":<><RotateCcw size={13}/> Начать пример заново</>}</button>
    </div><div className="telegram-composer"><Paperclip size={17}/><span>Сообщение</span><Send size={17}/></div>
  </div>;
}

export function ManagerPreview() {
  return <div className="manager-preview"><div className="manager-title"><span className="mini-avatar"><CheckCheck size={17}/></span><div><b>Новая заявка</b><small>Пример менеджер-панели</small></div></div><div className="manager-row"><span>Проект</span><b>Telegram-бот</b></div><div className="manager-row"><span>Статус</span><b className="status-chip">Новая</b></div><div className="manager-row"><span>Вложения</span><b><Paperclip size={13}/> brief.pdf</b></div><div className="manager-note">Контакты, файлы и детали —<br/>в одной заявке.</div></div>;
}
