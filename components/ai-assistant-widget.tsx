'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'ASSISTANT'; text: string }>>([
    {
      sender: 'ASSISTANT',
      text: 'Greetings. I am your TRIPORA RESERVE Concierge. How may I assist with your private sanctuaries, flight corridors, or bespoke reservations today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  async function handleSend(textToSend?: string) {
    const text = textToSend || input;
    if (!text.trim() || sending) return;

    const userMsg = { sender: 'USER' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await api.request('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
      });
      setMessages((prev) => [...prev, { sender: 'ASSISTANT', text: res.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ASSISTANT',
          text: 'I recommend exploring the old town quarter in the morning and saving open-air viewpoints for sunset! Let me know if you would like me to optimize your day slots.',
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating Action Pill */}
      <aside aria-label="Private Concierge Liaison" className="fixed bottom-20 right-4 sm:bottom-20 sm:right-6 lg:bottom-6 lg:right-6 z-40">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2.5 rounded-full bg-brand-forest px-5 py-3 text-xs font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#274a39] hover:shadow-2xl border border-white/20"
          >
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span>Private Concierge</span>
          </button>
        )}

        {/* Chat Drawer / Modal */}
        {open && (
          <div className="flex flex-col h-[520px] w-[360px] sm:w-[400px] rounded-3xl border border-brand-line bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-line bg-brand-forest px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-brand-gold">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-serif text-sm font-semibold">TRIPORA RESERVE Concierge</h3>
                  <p className="text-[10px] text-white/75">Active Trip &amp; Destination Liaison</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-mist/40 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ASSISTANT' && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-white text-[10px]">
                      <Bot className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.sender === 'USER'
                        ? 'bg-brand-forest text-white'
                        : 'border border-brand-line bg-white text-brand-ink shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex items-center gap-2 text-brand-muted text-[11px] italic">
                  <Loader2 className="h-3 w-3 animate-spin text-brand-forest" />
                  Tripora is thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex gap-1.5 overflow-x-auto border-t border-brand-line bg-white px-3 py-2 scrollbar-none">
              {['Weather tips', 'Best local dining', 'Budget shortcuts'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSend(chip)}
                  className="shrink-0 rounded-full border border-brand-line bg-brand-mist/60 px-2.5 py-1 text-[11px] font-medium text-brand-ink hover:bg-brand-mist"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-brand-line bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your trip, dining, or routes..."
                className="flex-1 rounded-xl border border-brand-line bg-brand-mist/30 px-3 py-2 text-xs text-brand-ink focus:outline-none focus:border-brand-forest"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-forest text-white disabled:opacity-40 transition-colors hover:bg-[#274a39]"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}
