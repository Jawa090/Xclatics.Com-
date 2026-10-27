import { useEffect, useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message={id:string;body:string;sender:string;direction:string};
export function CustomerChat(){
  const [open,setOpen]=useState(false); const [token,setToken]=useState(''); const [name,setName]=useState(''); const [body,setBody]=useState(''); const [messages,setMessages]=useState<Message[]>([]); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  useEffect(()=>{let value=sessionStorage.getItem('xclatix-chat-token');if(!value){value=crypto.randomUUID();sessionStorage.setItem('xclatix-chat-token',value);}setToken(value);},[]);
  async function refresh(){if(!token)return;const response=await fetch('/api/public/inbox/chat',{cache:'no-store',headers:{'X-Chat-Token':token}});if(response.ok){const data=await response.json();setMessages(data.messages);const first=data.messages.find((m:Message)=>m.direction==='inbound');if(first)setName(first.sender);}}
  useEffect(()=>{if(!open||!token)return;void refresh();const timer=setInterval(()=>void refresh(),5000);return()=>clearInterval(timer);},[open,token]);
  async function send(e:React.FormEvent){e.preventDefault();if(busy||!token)return;setBusy(true);setError('');const content=body;try{
    const response=await fetch('/api/public/inbox/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,name,body:content,requestId:crypto.randomUUID()})});
    if(!response.ok){const data=await response.json();throw new Error(data.error??'Unable to send.');}
    setBody('');const reader=response.body?.getReader();if(!reader)throw new Error('No response received.');const decoder=new TextDecoder();let buffer='';
    while(true){const next=await reader.read();if(next.done)break;buffer+=decoder.decode(next.value,{stream:true});const lines=buffer.split('\n');buffer=lines.pop()??'';for(const line of lines){if(!line.trim())continue;const event=JSON.parse(line);if(event.error)setError(event.error);await refresh();}}
  }catch(e){setError(e instanceof Error?e.message:'Unable to send.');}finally{setBusy(false);await refresh();}}
  return <div className="fixed bottom-5 right-5 z-50 max-w-[calc(100vw-40px)]">
    {open&&<section aria-label="Chat with Xclatix" className="mb-3 flex h-[min(560px,75dvh)] w-96 max-w-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-menu">
      <header className="flex items-center justify-between border-b bg-secondary px-5 py-4"><div className="flex items-center gap-3"><Bot className="text-primary"/><div><h2 className="text-base font-bold">Xclatix support</h2><p className="text-xs text-muted-foreground">AI assistant · human support available</p></div></div><Button size="icon" variant="ghost" aria-label="Close chat" onClick={()=>setOpen(false)}><X/></Button></header>
      <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">{!messages.length&&<p className="text-sm text-muted-foreground">Hello! What would you like to know about Xclatix?</p>}{messages.map(m=><div key={m.id} className={`max-w-[95%] rounded-md px-4 py-3 ${m.direction==='inbound'?'ml-auto bg-secondary':'border border-border bg-background'}`}><p className="mb-1 text-xs font-semibold text-primary">{m.direction==='inbound'?'You':m.sender}</p><p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{m.body}</p></div>)}{busy&&<p role="status" className="text-xs text-muted-foreground">Replying…</p>}</div>
      <form onSubmit={send} className="space-y-3 border-t p-4">{!messages.length&&<input aria-label="Your name" placeholder="Your name" required minLength={2} maxLength={100} value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2 text-sm"/>}<div className="flex gap-2"><textarea aria-label="Your message" placeholder="Your message…" required maxLength={3000} rows={2} value={body} onChange={e=>setBody(e.target.value)} className="min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm"/><Button type="submit" size="icon" aria-label="Send message" disabled={busy||!token}><Send/></Button></div>{error&&<p role="alert" className="text-xs text-destructive">{error}</p>}<p className="text-[11px] text-muted-foreground">AI replies may be inaccurate. Messages are saved for our team. Please avoid sensitive information.</p></form>
    </section>}
    <div className="flex justify-end"><Button aria-label={open?'Hide customer chat':'Chat with Xclatix'} onClick={()=>setOpen(!open)} className="rounded-full px-5 shadow-menu"><MessageCircle/>Chat with us</Button></div>
  </div>;
}