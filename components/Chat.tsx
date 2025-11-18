
'use client';

import { useState } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user' as 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: 'bot' as 'bot', text: data.reply || data.error }]);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Chat with my AI
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-white shadow-lg rounded-lg flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-bold text-lg">AI Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Ask me about Sunni..."
              />
              <button onClick={handleSend} className="ml-2 bg-blue-500 text-white p-2 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
