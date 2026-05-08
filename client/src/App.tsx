import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface Message {
  id: number;
  role: 'user' | 'agent';
  text: string;
  softwareInformation?: SoftwareInformation;
}

interface SoftwareInformation {
  publisher?: string | null;
  softwareName?: string | null;
  version?: string | null;
  eolDate?: string | null;
  source?: string | null;
  explanation?: string | null;
}

const API_URL = 'http://localhost:3001/chat';

const softwareInformationRows: { label: string; key: keyof SoftwareInformation }[] = [
  { label: 'Publisher', key: 'publisher' },
  { label: 'Software Name', key: 'softwareName' },
  { label: 'Version', key: 'version' },
  { label: 'End-Of-Life Date', key: 'eolDate' },
  { label: 'Source', key: 'source' },
  { label: 'Explanation', key: 'explanation' },
];

const getSoftwareInformation = (data: any): SoftwareInformation => {
  if (typeof data?.reply === 'string') {
    try {
      return JSON.parse(data.reply);
    } catch {
      return { explanation: data.reply };
    }
  }

  return data.reply ?? data;
};

const isValidHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const renderSoftwareInformationValue = (
  key: keyof SoftwareInformation,
  value?: string | null,
) => {
  if (!value) return '-';

  if (key === 'source' && isValidHttpUrl(value)) {
    return (
      <a className="software-info-link" href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    );
  }

  return value;
};

const SoftwareInformationTable = ({ info }: { info: SoftwareInformation }) => (
  <table className="software-info-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {softwareInformationRows.map((row) => (
        <tr key={row.key}>
          <td>{row.label}</td>
          <td>{renderSoftwareInformationValue(row.key, info[row.key])}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = prompt.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      const softwareInformation = getSoftwareInformation(data);
      const agentMsg: Message = {
        id: Date.now() + 1,
        role: 'agent',
        text: '',
        softwareInformation,
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'agent', text: 'Error: could not reach the server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        <h1>Agent Chat</h1>
      </header>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">Send a message to start the conversation.</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble chat-bubble--${msg.role}`}>
            <span className="chat-bubble__label">{msg.role === 'user' ? 'You' : 'Agent'}</span>
            {msg.softwareInformation ? (
              <SoftwareInformationTable info={msg.softwareInformation} />
            ) : (
              <p className="chat-bubble__text">{msg.text}</p>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble chat-bubble--agent">
            <span className="chat-bubble__label">Agent</span>
            <p className="chat-bubble__text chat-typing">Thinking…</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className="chat-send-btn" onClick={sendMessage} disabled={loading || !prompt.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
