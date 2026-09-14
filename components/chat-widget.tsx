"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { siteConfig } from "@/data/projects";
import { sendContactMessage } from "@/lib/contact";

export function ChatWidget({open,onOpenChange}:{open:boolean;onOpenChange:(open:boolean)=>void}) {
  const [status,setStatus]=useState<"idle"|"sending"|"success">("idle");
  const [error,setError]=useState("");
  const [demo,setDemo]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form=event.currentTarget; const data=new FormData(form);
    const payload={name:String(data.get("name")||"").trim(),contact:String(data.get("contact")||"").trim(),message:String(data.get("message")||"").trim()};
    if(!payload.name||!payload.contact||!payload.message){setError("Пожалуйста, заполните все поля.");return;}
    setStatus("sending");setError("");
    try{const result=await sendContactMessage(payload);setDemo(result.demo);setStatus("success");form.reset();}
    catch(error){setError(error instanceof Error?error.message:"Не удалось отправить сообщение.");setStatus("idle");}
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild><button className="chat-launcher" aria-label="Открыть чат — обсудить проект"><MessageCircle size={25}/></button></DialogTrigger>
    <DialogContent className="contact-dialog translate-x-0 translate-y-0" showCloseButton={false} onCloseAutoFocus={(e)=>{e.preventDefault();document.querySelector<HTMLButtonElement>(".chat-launcher")?.focus();}}>
      <DialogClose className="contact-close" aria-label="Закрыть окно"><X size={20}/></DialogClose>
      <div className="contact-icon"><Send size={24}/></div><DialogTitle className="contact-title">Обсудить проект</DialogTitle><DialogDescription>Коротко опишите задачу.</DialogDescription>
      {status==="success"?<div className="contact-success" role="status"><span><Check size={28}/></span><h3>Спасибо.<br/>Сообщение отправлено.</h3><p>{demo?"Это демонстрация формы: сообщение не доставлено. Напишите мне в Telegram — там я его получу.":"Скоро вернусь с ответом."}</p><button className="text-button" onClick={()=>setStatus("idle")}>Новое сообщение</button></div>:<form onSubmit={submit} className="contact-form"><label>Имя<input autoComplete="name" name="name" placeholder="Как вас зовут" required maxLength={100}/></label><label>Telegram / способ связи<input autoComplete="off" name="contact" placeholder="@username или email" required maxLength={160}/></label><label>Сообщение<textarea name="message" placeholder="Что нужно сделать?" rows={3} required maxLength={3000}/></label>{error&&<p className="form-error" role="alert">{error}</p>}<p className="demo-note">Форма в деморежиме. Для связи — Telegram ниже.</p><button className="button submit-button" disabled={status==="sending"}>{status==="sending"?<><LoaderCircle className="spin" size={16}/> Отправляю…</>:<>Отправить <ArrowIcon/></>}</button></form>}
      <a className="contact-direct" href={siteConfig.telegram} target="_blank" rel="noopener noreferrer"><Send size={16}/> Написать напрямую в Telegram</a>
    </DialogContent>
  </Dialog>;
}
function ArrowIcon(){return <Send size={16}/>;}
