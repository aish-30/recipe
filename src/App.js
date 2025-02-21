import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const RecipeApp = () => {
  const [vegetables, setVegetables] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi', isUser: true },
    { text: "I'll help you find recipes with those ingredients!", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const mainContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url('img.avif')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Dark overlay for better contrast
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  };

  const inputStyle = {
    width: '300px',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const chatIconStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    border: 'none'
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '300px',
    height: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const chatHeaderStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '15px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const chatMessagesStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const messageStyle = (isUser) => ({
    maxWidth: '80%',
    padding: '8px 12px',
    borderRadius: '12px',
    backgroundColor: isUser ? '#f0f0f0' : 'black',
    color: isUser ? 'black' : 'white',
    alignSelf: isUser ? 'flex-end' : 'flex-start'
  });

  const chatInputContainerStyle = {
    display: 'flex',
    padding: '10px',
    gap: '10px',
    borderTop: '1px solid #eee'
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage('');
    }
  };

  return (
    <div style={mainContainerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1>Find Your Recipe</h1>
        <input
          type="text"
          value={vegetables}
          onChange={(e) => setVegetables(e.target.value)}
          placeholder="Enter vegetables (e.g., tomato, spinach)"
          style={inputStyle}
        />
        <button style={buttonStyle}>Get Recipes</button>
      </div>

      {!isChatOpen ? (
        <button 
          style={chatIconStyle}
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div style={chatWindowStyle}>
          <div style={chatHeaderStyle}>
            <span>Recipe Assistant</span>
            <button 
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <div style={chatMessagesStyle}>
            {messages.map((message, index) => (
              <div key={index} style={messageStyle(message.isUser)}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={chatInputContainerStyle}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything..."
              style={{ ...inputStyle, flex: 1, padding: '8px' }}
            />
            <button 
              type="submit" 
              style={{ ...buttonStyle, padding: '8px 16px' }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RecipeApp;
