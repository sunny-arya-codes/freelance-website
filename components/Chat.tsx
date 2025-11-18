'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils'; // Assuming you have a utility for combining classes

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user' as 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // --- Business Logic Integration ---
    // Placeholder for actual API call
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot' as 'bot', text: data.reply || data.error || "Sorry, I'm having trouble connecting to my brain." }]);
    } catch (error) {
       setMessages((prev) => [...prev, { sender: 'bot' as 'bot', text: "Network error. Please try again later." }]);
    }
  };

  return (
    <div className="z-[100] relative">
      {/* 1. Enhanced Floating Action Button (FAB) */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 z-50",
          "bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-2 border-white/20",
          isOpen ? 'rotate-90 scale-90 bg-red-500 hover:bg-red-600' : 'hover:scale-105'
        )}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>

      {/* 2. Premium Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[550px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-xl z-40 animate-in slide-in-from-bottom-10 fade-in-5">
          
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 backdrop-blur-md flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI Assistant</h3>
              <p className="text-xs text-white/50">Ask me anything about Sunni</p>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-transparent">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                     <Avatar className="w-7 h-7 shrink-0 border border-white/10">
                        <AvatarFallback className={msg.sender === 'user' 
                          ? 'bg-blue-600 text-white text-xs' 
                          : 'bg-white/10 text-blue-300 text-xs'}
                        >
                             {msg.sender === 'user' ? 'U' : 'AI'}
                        </AvatarFallback>
                     </Avatar>
                     <div
                      className={cn(
                        "p-3 text-sm rounded-xl shadow-md leading-relaxed",
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white/10 text-white rounded-bl-none border border-white/5'
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-blue-500/50"
                placeholder="Type your question..."
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;