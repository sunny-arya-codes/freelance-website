'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, X, Mic, Loader2, Terminal, RefreshCw, Bot,
  ChevronDown, DollarSign, File, Activity, Zap, Search, Play
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'ai';
  text: string;
  id: string;
}

// 1. The High-Converting Hook
const INITIAL_GREETING = "Hey, want me to **audit your business** and show where AI can save you money? 💰\n\nSelect a tool below to run a live simulation.";

// 2. The "Audit Mode" Tools
const QUICK_ACTIONS = [
  {
    icon: Search,
    label: "Business Audit",
    prompt: "I want to audit my current business processes. Where can AI save me time and money?",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: Activity,
    label: "Problem Diagnosis",
    prompt: "I have a specific operational bottleneck. Can you help me diagnose the root cause and suggest an AI fix?",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  {
    icon: Zap,
    label: "Feature Recommender",
    prompt: "Based on my industry, what top 3 AI features should I add to my product to beat competitors?",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  {
    icon: Play,
    label: "PoC Plan Generator",
    prompt: "Generate a 30-day Proof of Concept (PoC) plan to validate an AI idea quickly.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    icon: DollarSign,
    label: "Cost Calculator",
    prompt: "Help me calculate the potential ROI and cost savings of automating my operations.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    icon: File,
    label: "Proposal Gen",
    prompt: "Draft a quick executive summary/proposal for an AI transformation project.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
];

const MarkdownRenderer = memo(({ content, role }: { content: string; role: 'user' | 'ai' }) => {
  return (
    <ReactMarkdown
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
  const [showTooltip, setShowTooltip] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Init greeting & Tooltip Timer
  useEffect(() => {
    setMessages([{ role: 'ai', text: INITIAL_GREETING, id: 'init' }]);

    // Pop up in 3 seconds exactly
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Listen for Hero button
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };

    window.addEventListener('open-liquid-chat', handleOpenChat);
    return () => window.removeEventListener('open-liquid-chat', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 300);
    }
  }, [messages, isOpen, isStreaming]);

  const handleActionClick = (prompt: string) => {
    setInputValue(prompt);
    // Slight delay to mimic "typing" or selection feel
    setTimeout(() => handleSend(prompt), 200);
  };

  const handleSend = async (manualText?: string) => {
    const textToSend = manualText || inputValue;
    if (!textToSend.trim() || isSending || isStreaming) return;

    const userMsgId = `${Date.now()}-user`;
    const aiMsgId = `${Date.now()}-ai`;

    setInputValue('');
    setIsOpen(true);
    setShowTooltip(false);

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', text: textToSend },
      { id: aiMsgId, role: 'ai', text: '' },
    ]);

    setIsSending(true);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok || !res.body) {
        const errorText = await res.text().catch(() => '');
        throw new Error(errorText || 'Something went wrong.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

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
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'ai',
          text: `**Error:** ${err?.message || 'Network error.'}`,
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
    setMessages([{ role: 'ai', text: INITIAL_GREETING, id: Date.now().toString() }]);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-full max-w-4xl px-4 pointer-events-none">

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full bg-background/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/5"
              style={{ height: '80vh', maxHeight: '850px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-purple-600 shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-foreground tracking-tight">AI Audit & Strategy Agent</span>
                    <span className="block text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      Online & Ready to Audit
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleRefresh} className="p-2 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full transition-colors"><RefreshCw className="w-4 h-4" /></button>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full transition-colors"><ChevronDown className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-background/50 to-muted/20 scrollbar-thin scrollbar-thumb-border">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const isEmptyAI = msg.role === 'ai' && !msg.text && (isSending || isStreaming);

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] text-sm px-6 py-4 shadow-sm ${isUser ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-none' : 'bg-card text-foreground rounded-2xl rounded-bl-none border border-border/50 backdrop-blur-md'}`}>
                        {isEmptyAI ? (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /><span>Analyzing...</span></div>
                        ) : (
                          <MarkdownRenderer content={msg.text} role={msg.role} />
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* QUICK ACTIONS GRID (Only show if just 1 message) */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4"
                  >
                    {QUICK_ACTIONS.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(action.prompt)}
                        className={`text-left p-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${action.bg} ${action.border} group`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <action.icon className={`w-4 h-4 ${action.color}`} />
                          <span className="text-xs font-bold text-foreground/90">{action.label}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight opacity-80 group-hover:opacity-100">
                          {action.prompt.slice(0, 40)}...
                        </p>
                      </button>
                    ))}
                  </motion.div>
                )}

                {isStreaming && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-card/50 border border-border/50 rounded-xl px-4 py-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Terminal className="w-3 h-3" />
                      <span className="animate-pulse">Generating strategic plan...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-background/60 backdrop-blur-xl border-t border-white/5">
                <div className="relative flex items-center gap-2 p-2 pl-5 bg-background/80 border border-white/10 rounded-full shadow-inner focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                  {isSending || isStreaming ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <Sparkles className="w-5 h-5 text-primary" />}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSending || isStreaming}
                    placeholder="Type your business problem..."
                    className="flex-1 bg-transparent border-none text-base text-foreground placeholder:text-muted-foreground focus:outline-none py-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isSending || isStreaming}
                    className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${inputValue.trim() && !isSending && !isStreaming ? 'bg-primary text-primary-foreground shadow-lg hover:scale-105' : 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'}`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat-button"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0, transition: { duration: 0.1 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto relative group"
            >
              {/* THE "POP UP" CALLOUT */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 bg-foreground text-background text-xs font-medium p-3 rounded-2xl shadow-xl pointer-events-none text-center"
                  >
                    Hey, want me to audit your business and show where AI can save you money?
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-background/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.2)] hover:scale-105 transition-all duration-300 group-hover:border-primary/30"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-ping opacity-20" />
                  <div className="relative bg-gradient-to-tr from-primary to-purple-500 p-2 rounded-full text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
                </div>

                <span className="font-medium text-sm text-foreground pr-1">
                  Start AI Audit
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};