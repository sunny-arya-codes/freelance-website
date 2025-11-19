'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, Mic, Loader2, Terminal, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'ai';
  text: string;
  id: string;
}

const GREETINGS = [
  "Hello! I'm Sunni's AI Assistant. \n\nI can tell you about:\n* **Tech Stack** (React, Next.js, Python)\n* **Experience** (Senior Engineer Roles)\n* **Contact Info**",
  "Hi there! 👋 I'm here to help you explore Sunni's portfolio.\n\nAsk me about his:\n* **Projects** and Case Studies\n* **Technical Skills**\n* **Work History**",
  "Welcome! I'm Sunni's virtual assistant. \n\nCurious about something? I can answer questions about:\n* **Frontend & Backend Skills**\n* **Professional Experience**\n* **Contact Details**"
];

// --- Typewriter Effect Component ---
const Typewriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset if text changes significantly (new message)
    if (!text.startsWith(displayedText) && displayedText !== '') {
      setDisplayedText('');
      indexRef.current = 0;
    }
  }, [text]);

  useEffect(() => {
    if (indexRef.current >= text.length) {
      if (onComplete) onComplete();
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedText((prev) => prev + text.charAt(indexRef.current));
      indexRef.current += 1;
    }, 15 + Math.random() * 10); // Randomize typing speed slightly for realism

    return () => clearTimeout(timeoutId);
  }, [displayedText, text, onComplete]);

  // If the text was already fully displayed (e.g. from history), just show it all
  // This prevents re-typing old messages on re-renders if we handled state differently,
  // but here we want the effect for new messages. 
  // For simplicity in this component, we just type what we're given.

  return <MarkdownRenderer content={displayedText} role="ai" />;
};

// --- Custom Markdown Components for the Liquid Theme ---
const MarkdownRenderer = memo(({ content, role }: { content: string, role: 'user' | 'ai' }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Paragraphs
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        // Bold
        strong: ({ children }) => <span className="font-bold text-foreground">{children}</span>,
        // Links
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
            {children}
          </a>
        ),
        // Lists
        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        // Inline Code
        code: ({ className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;
          return isInline ? (
            <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${role === 'user' ? 'bg-primary/80 text-primary-foreground' : 'bg-muted text-primary border border-border'
              }`}>
              {children}
            </code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        // Code Blocks
        pre: ({ children }) => (
          <div className="relative my-3 rounded-lg overflow-hidden border border-border bg-card/50 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted border-b border-border">
              <Terminal className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase font-mono">Code</span>
            </div>
            <pre className="p-3 overflow-x-auto text-xs font-mono text-muted-foreground scrollbar-thin scrollbar-thumb-border">
              {children}
            </pre>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export const LiquidChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // For typewriter effect status
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize random greeting
  useEffect(() => {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ role: 'ai', text: randomGreeting, id: 'init' }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || isTyping) return;

    const userText = inputValue;
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { role: 'user', text: userText, id: userMsgId }]);
    setInputValue("");
    setIsOpen(true);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const aiMsgId = (Date.now() + 1).toString();

      // Handle different error types
      if (!res.ok) {
        let errorMessage = data.error || "I encountered an error processing that request.";

        if (res.status === 429) {
          // Rate limit or quota exceeded
          if (data.quotaExceeded) {
            errorMessage = `⚠️ **AI Quota Limit Reached**\n\nThe AI service has reached its usage limit for now. Please try again in ${data.retryAfter || 60} seconds.\n\nIn the meantime, feel free to explore the portfolio sections above!`;
          } else if (data.retryAfter) {
            errorMessage = `⏱️ **Please Wait**\n\nTo ensure quality responses, please wait ${data.retryAfter} seconds before sending another message.`;
          }
        } else if (res.status === 503) {
          errorMessage = "🔄 **Service Temporarily Busy**\n\nThe AI service is currently handling other requests. Please try again in a moment.";
        }

        setMessages((prev) => [...prev, {
          role: 'ai',
          text: errorMessage,
          id: aiMsgId
        }]);
      } else {
        // Success response (includes fallback and cached responses)
        let responseText = data.reply;

        if (data.cached) {
          responseText = `${data.reply}\n\n*✨ Instant response from cache*`;
        } else if (data.fallback) {
          // Fallback responses are already formatted with the footer
          responseText = data.reply;
        }

        setMessages((prev) => [...prev, {
          role: 'ai',
          text: responseText,
          id: aiMsgId
        }]);

        // Start typing effect for the new message
        setIsTyping(true);
      }

    } catch (error) {
      setMessages((prev) => [...prev, {
        role: 'ai',
        text: "**Network Error:** Unable to reach the AI service. Please check your connection and try again.",
        id: Date.now().toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefresh = () => {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ role: 'ai', text: randomGreeting, id: Date.now().toString() }]);
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: '60vh' }} // Increased height slightly for reading
              exit={{ opacity: 0, y: 20, scale: 0.95, height: 0 }}
              className="mb-4 w-full bg-background/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl ring-1 ring-border"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/20">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground tracking-wide">AI Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleRefresh}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
                    title="Reset Chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {messages.map((msg, idx) => {
                  const isLast = idx === messages.length - 1;
                  const isAI = msg.role === 'ai';
                  // Only use typewriter for the last message if it's AI and we are in "typing" mode
                  // But for the initial greeting (id='init'), we might not want to type it every time, 
                  // or maybe we do? Let's just type new messages.
                  // Actually, let's type the last AI message if it's not the initial one, or if we want.
                  // Simple rule: If it's the last message, it's AI, and we just received it (isTyping is true), type it.
                  // For history, just show it.

                  const shouldType = isLast && isAI && isTyping;

                  return (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-3 text-sm shadow-sm ${msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm shadow-primary/20'
                        : 'bg-card text-foreground rounded-bl-sm border border-border backdrop-blur-sm'
                        }`}>
                        {shouldType ? (
                          <Typewriter
                            text={msg.text}
                            onComplete={() => setIsTyping(false)}
                          />
                        ) : (
                          <MarkdownRenderer content={msg.text} role={msg.role} />
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar */}
        <motion.div layout className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full opacity-20 group-hover:opacity-40 transition duration-500 blur-xl" />

          <div className="relative flex items-center gap-2 p-2 pl-4 bg-background/60 backdrop-blur-2xl border border-border rounded-full shadow-2xl ring-1 ring-border transition-all duration-300 hover:bg-background/80">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Sparkles className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
            )}

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={() => setIsOpen(true)}
              disabled={isLoading || isTyping}
              placeholder={isLoading ? "Thinking..." : isTyping ? "AI is typing..." : "Ask me anything..."}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm h-10 px-2 disabled:opacity-50"
            />

            <div className="flex items-center gap-1 pr-1">
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || isTyping}
                className={`p-2 rounded-full transition-all duration-300 ${inputValue.trim() && !isLoading && !isTyping
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </>
  );
};