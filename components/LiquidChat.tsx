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

const GREETINGS: string[] = [
  "Hello! I'm Sunny's AI Assistant. \n\nI can tell you about:\n* **Tech Stack**\n* **Projects**\n* **Experience**\n* **Contact Info**",
  "Welcome! I'm Sunny's virtual assistant. \n\nCurious about something?\n\nTry asking:\n* \"What skills does Sunny use?\"\n* \"Explain one of Sunny's projects.\"\n* \"Help me with a tech doubt.\"",
  "Hey there 👋\n\nI can answer questions about Sunny, his work, and general programming / AI topics.\n\nType your question below to get started."
];

const MarkdownRenderer = memo(({ content, role }: { content: string; role: 'user' | 'ai' }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        strong: ({ children }) => <span className="font-semibold text-foreground">{children}</span>,
        em: ({ children }) => <span className="italic text-muted-foreground">{children}</span>,
        ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>,
        li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {children}
          </a>
        ),
        code({ inline, className, children, ...props }: any) {
          if (inline) {
            return (
              <code
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono border ${role === 'user'
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-muted text-muted-foreground border-border'
                  }`}
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <pre className="mt-2 rounded-lg bg-black/90 text-gray-100 text-xs p-3 overflow-x-auto border border-border">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },
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
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // init greeting
  useEffect(() => {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ role: 'ai', text: randomGreeting, id: 'init' }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isStreaming]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending || isStreaming) return;

    const userText = inputValue.trim();
    const userMsgId = `${Date.now()}-user`;
    const aiMsgId = `${Date.now()}-ai`;

    setInputValue('');
    setIsOpen(true);

    // push user + placeholder ai message
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', text: userText },
      { id: aiMsgId, role: 'ai', text: '' },
    ]);

    setIsSending(true);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok || !res.body) {
        const errorText = await res.text().catch(() => '');
        throw new Error(errorText || 'Something went wrong while talking to the AI.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // stream chunks from the API
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.id === aiMsgId) {
            last.text += chunk;
          }
          return updated;
        });
      }
    } catch (err: any) {
      const message =
        err?.message ||
        'Network error while reaching the AI service. Please try again in a bit.';

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'ai',
          text: `**Error:** ${message}`,
        },
      ]);
    } finally {
      setIsSending(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: '60vh' }}
              exit={{ opacity: 0, y: 20, scale: 0.95, height: 0 }}
              className="mb-4 w-full bg-background/95 backdrop-blur-xl border border-border rounded-3xl overflow-hidden flex flex-col shadow-2xl ring-1 ring-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/15">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground tracking-wide">
                    AI Assistant
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleRefresh}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-background rounded-full"
                    title="Reset chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-background rounded-full"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 min-h-[260px] max-h-[360px] overflow-y-auto px-4 py-3 space-y-2 bg-gradient-to-b from-background/80 via-background to-muted/60">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const isEmptyAI = msg.role === 'ai' && !msg.text && (isSending || isStreaming);

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] text-sm rounded-2xl px-4 py-2 shadow-sm ${isUser
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-card text-foreground rounded-bl-sm border border-border backdrop-blur-sm'
                          }`}
                      >
                        {isEmptyAI ? (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span>Thinking...</span>
                          </div>
                        ) : (
                          <MarkdownRenderer content={msg.text} role={msg.role} />
                        )}
                      </div>
                    </div>
                  );
                })}

                {isStreaming && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Streaming response...</span>
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
          <div className="relative flex items-center gap-2 p-2 pl-4 bg-background/60 backdrop-blur-md shadow-lg border border-border rounded-full transition-all duration-300 hover:bg-background/80">
            {isSending || isStreaming ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Sparkles
                className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}
              />
            )}

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={() => setIsOpen(true)}
              disabled={isSending || isStreaming}
              placeholder="Ask anything about Sunny, his projects, or tech..."
              className="flex-1 bg-transparent border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />

            <button
              type="button"
              disabled
              className="p-2 rounded-full bg-muted text-muted-foreground cursor-not-allowed"
              title="Voice input coming soon"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending || isStreaming}
              className={`p-2 rounded-full transition-all duration-300 ${inputValue.trim() && !isSending && !isStreaming
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
