
import React, { useState, useEffect, useRef } from 'react';
import '../DesignSystem.css';
import MarketTicker from './MarketTicker';
import '../DesignSystem.css';

const FarmingAssistant = ({ overrideRole }) => {
  const role = overrideRole || localStorage.getItem('user_role') || 'farmer';
  const roleName = role === 'rice_mill' ? 'Rice Mill' : role === 'market_analyst' ? 'Market Analyst' : 'Krishi';

  const user = JSON.parse(localStorage.getItem('krishi_user') || '{}');
  const isVerified = user?.profile?.verification_status === 'VERIFIED';

  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Namaste${isVerified ? ' Verified Member' : ''} !I am your ${roleName} AI Assistant.How can I help you ? ` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/ai/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, role: role, is_verified: isVerified }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Sorry, I'm having trouble connecting to the AI. Please try again or check your internet." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-container">
      <MarketTicker />
      <section className="glass-card chat-card">
        <div className="chat-header">
          <h3>💬 AI {roleName} Assistant {isVerified && '✅'}</h3>
          <span className="status">🟢 Online</span>
        </div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message-bubble ${msg.role}`}>
              <div className="msg-content">{msg.content}</div>
            </div>
          ))}
          {loading && <div className="message-bubble assistant loading">...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about crops, soil, prices..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="voice-btn">🎙️</button>
          <button className="btn-primary send-btn" onClick={handleSend} disabled={loading}>
            Send
          </button>
        </div>
      </section>

      <style>{`
        .assistant-container {
          max-width: 800px;
          margin: 2rem auto;
          height: 80vh;
        }
        .chat-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .chat-window {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message-bubble {
          max-width: 80%;
          padding: 1rem;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .message-bubble.assistant {
          align-self: flex-start;
          background: #e9ecef;
          color: var(--text-dark);
          border-bottom-left-radius: 5px;
        }
        .message-bubble.user {
          align-self: flex-end;
          background: linear-gradient(90deg, var(--primary-green), var(--secondary-green));
          color: white;
          border-bottom-right-radius: 5px;
        }
        .loading { font-style: italic; opacity: 0.7; }
        .chat-input-area {
          display: flex;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }
        .chat-input-area input {
          flex: 1;
          padding: 1rem;
          border-radius: 30px;
          border: 1px solid #ddd;
          outline: none;
        }
        .voice-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .send-btn { border-radius: 30px; }
      `}</style>
    </div>
  );
};

export default FarmingAssistant;
