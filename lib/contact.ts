import { siteConfig } from "@/data/projects";

export type ContactMessage = { name: string; contact: string; message: string };
export async function sendContactMessage(message: ContactMessage): Promise<{ demo: boolean }> {
  if (!siteConfig.contactEndpoint) return { demo: true };
  const response = await fetch(siteConfig.contactEndpoint, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message),
  });
  if (!response.ok) throw new Error("Не удалось отправить сообщение. Попробуйте ещё раз или напишите в Telegram.");
  return { demo: false };
}
