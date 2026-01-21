import React, { useState, useEffect, useRef } from 'react';

// Safe character definitions (original characters to avoid licensing issues)
const CHARACTERS = [
  {
    id: 'aurora',
    name: 'Princess Aurora',
    tagline: 'The Ice Crystal Princess',
    description: 'A magical princess who controls snow and ice. She loves making snowflakes and teaching kindness.',
    avatar: '❄️',
    color: '#7dd3fc',
    gradient: 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 50%, #38bdf8 100%)',
    personality: 'You are Princess Aurora, a kind and magical ice princess. You speak gently and encourage creativity, kindness, and bravery. You love winter, snowflakes, and helping friends. Keep responses short, positive, and age-appropriate for children ages 4-10. Never discuss anything scary, violent, or inappropriate. Always be encouraging and supportive.',
    greetings: ["Hello, little friend! ❄️ Would you like to make some magic with me today?", "Welcome to my ice palace! What adventures shall we have?"]
  },
  {
    id: 'leo',
    name: 'Leo the Brave',
    tagline: 'Adventure Lion Hero',
    description: 'A courageous young lion who goes on adventures and always helps his friends.',
    avatar: '🦁',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%)',
    personality: 'You are Leo the Brave, a friendly young lion hero. You love adventures, being brave (but not reckless), and helping friends. You teach courage, friendship, and doing the right thing. Keep responses short, positive, and age-appropriate for children ages 4-10. Never discuss anything scary or inappropriate. Be encouraging and fun!',
    greetings: ["Roar! Hello, brave adventurer! Ready for a fun quest?", "Hey friend! Leo here! What exciting things shall we do today?"]
  },
  {
    id: 'stella',
    name: 'Stella Stardust',
    tagline: 'Space Explorer',
    description: 'A curious astronaut who explores the galaxy and loves teaching about stars and planets.',
    avatar: '🚀',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 50%, #7c3aed 100%)',
    personality: 'You are Stella Stardust, a friendly space explorer. You love stars, planets, rockets, and discovering new things about the universe. You make learning about space fun and exciting. Keep responses short, educational, positive, and age-appropriate for children ages 4-10. Never discuss anything scary. Be curious and wonder-filled!',
    greetings: ["3... 2... 1... Blast off! Hello, space cadet! 🌟", "Greetings from the stars! Ready to explore the galaxy together?"]
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    tagline: 'Ocean Friend',
    description: 'A playful dolphin who knows all about the ocean and loves to play games.',
    avatar: '🐬',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #cffafe 0%, #22d3ee 50%, #06b6d4 100%)',
    personality: 'You are Bubbles, a playful and friendly dolphin. You love swimming, playing games, and teaching about ocean life. You are cheerful, silly sometimes, and always kind. Keep responses short, fun, and age-appropriate for children ages 4-10. Never discuss anything scary. Be playful and make splashy jokes!',
    greetings: ["Splash splash! Hello, friend! 🌊 Want to swim with me?", "Click click! (That's dolphin for hello!) Ready to dive into fun?"]
  },
  {
    id: 'pixel',
    name: 'Pixel',
    tagline: 'Robot Buddy',
    description: 'A friendly robot who loves puzzles, games, and learning new things together.',
    avatar: '🤖',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #dcfce7 0%, #4ade80 50%, #22c55e 100%)',
    personality: 'You are Pixel, a friendly and curious robot. You love puzzles, math games, coding concepts (explained simply), and learning. You speak with occasional fun robot sounds like "beep boop!" You are helpful and encouraging. Keep responses short, educational, and age-appropriate for children ages 4-10. Never discuss anything inappropriate. Be enthusiastic about learning!',
    greetings: ["Beep boop! Hello, human friend! 🔧 What shall we learn today?", "PIXEL online! Ready to solve puzzles and have fun!"]
  },
  {
    id: 'flutter',
    name: 'Flutter',
    tagline: 'Garden Fairy',
    description: 'A tiny fairy who takes care of flowers and teaches about nature and kindness.',
    avatar: '🧚',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #f472b6 50%, #ec4899 100%)',
    personality: 'You are Flutter, a gentle garden fairy. You love flowers, butterflies, nature, and spreading kindness. You speak softly and sweetly, teaching about plants, animals, and being kind to nature. Keep responses short, gentle, and age-appropriate for children ages 4-10. Never discuss anything scary. Be magical and nurturing!',
    greetings: ["*sprinkles fairy dust* ✨ Hello, little one! Welcome to my garden!", "The flowers told me you were coming! How wonderful to meet you!"]
  }
];

// Content filter for child safety
const contentFilter = (text) => {
  const blockedPatterns = [
    /\b(kill|die|death|blood|scary|monster|hate|stupid|dumb|ugly)\b/gi,
    /\b(gun|weapon|fight|hurt|pain)\b/gi,
  ];
  
  let filtered = text;
  blockedPatterns.forEach(pattern => {
    filtered = filtered.replace(pattern, '***');
  });
  return filtered;
};

// Parental PIN component
const ParentalGate = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [mathProblem] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 10;
    const b = Math.floor(Math.random() * 10) + 5;
    return { a, b, answer: a + b };
  });

  const handleSubmit = () => {
    if (parseInt(pin) === mathProblem.answer) {
      onSuccess();
    } else {
      setError('Incorrect answer. Please try again.');
      setPin('');
    }
  };

  return (
    <div style={styles.parentalGateOverlay}>
      <div style={styles.parentalGateModal}>
        <h2 style={styles.parentalGateTitle}>👋 Grown-Up Check</h2>
        <p style={styles.parentalGateText}>
          Please solve this math problem to continue:
        </p>
        <p style={styles.mathProblem}>
          {mathProblem.a} + {mathProblem.b} = ?
        </p>
        <input
          type="number"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter answer"
          style={styles.pinInput}
        />
        {error && <p style={styles.errorText}>{error}</p>}
        <div style={styles.parentalGateButtons}>
          <button onClick={onCancel} style={styles.cancelButton}>Cancel</button>
          <button onClick={handleSubmit} style={styles.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

// Home Screen with character selection
const HomeScreen = ({ onSelectCharacter, onOpenSettings, childName }) => {
  return (
    <div style={styles.homeContainer}>
      <div style={styles.homeHeader}>
        <div style={styles.logoContainer}>
          <span style={styles.logoEmoji}>🌈</span>
          <h1 style={styles.appTitle}>FriendlyChat</h1>
        </div>
        <button onClick={onOpenSettings} style={styles.settingsButton}>
          ⚙️
        </button>
      </div>
      
      <div style={styles.welcomeSection}>
        <h2 style={styles.welcomeText}>
          Hi {childName || 'there'}! 👋
        </h2>
        <p style={styles.welcomeSubtext}>
          Who would you like to chat with today?
        </p>
      </div>

      <div style={styles.characterGrid}>
        {CHARACTERS.map((character) => (
          <button
            key={character.id}
            onClick={() => onSelectCharacter(character)}
            style={{
              ...styles.characterCard,
              background: character.gradient,
            }}
          >
            <span style={styles.characterAvatar}>{character.avatar}</span>
            <h3 style={styles.characterName}>{character.name}</h3>
            <p style={styles.characterTagline}>{character.tagline}</p>
          </button>
        ))}
      </div>
      
      <div style={styles.safetyBadge}>
        <span>🛡️ Kid-Safe • No Ads • Parent Approved</span>
      </div>
    </div>
  );
};

// Chat Screen
const ChatScreen = ({ character, onBack, childName }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    const greeting = character.greetings[Math.floor(Math.random() * character.greetings.length)];
    setMessages([{ 
      id: 1, 
      text: greeting, 
      sender: 'character',
      timestamp: new Date()
    }]);
  }, [character]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: contentFilter(inputText.trim()),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 150,
          system: `${character.personality} The child's name is ${childName || 'friend'}. Keep responses under 3 sentences. Be warm and engaging. Never break character.`,
          messages: [
            ...messages.slice(-6).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: userMessage.text }
          ]
        })
      });

      const data = await response.json();
      const characterResponse = data.content?.[0]?.text || "Oops! I got a little confused. Can you say that again?";

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: contentFilter(characterResponse),
        sender: 'character',
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Oh no! My magic seems a bit fuzzy right now. Let's try again in a moment! ✨",
        sender: 'character',
        timestamp: new Date()
      }]);
    }

    setIsLoading(false);
  };

  const quickReplies = [
    "Tell me a joke! 😄",
    "What's your favorite thing?",
    "Can we play a game?",
    "Tell me a story!"
  ];

  return (
    <div style={{
      ...styles.chatContainer,
      background: `linear-gradient(180deg, ${character.color}22 0%, #ffffff 100%)`
    }}>
      <div style={{
        ...styles.chatHeader,
        background: character.gradient
      }}>
        <button onClick={onBack} style={styles.backButton}>←</button>
        <div style={styles.chatHeaderInfo}>
          <span style={styles.chatHeaderAvatar}>{character.avatar}</span>
          <div>
            <h2 style={styles.chatHeaderName}>{character.name}</h2>
            <span style={styles.onlineStatus}>● Online</span>
          </div>
        </div>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.messageBubble,
              ...(message.sender === 'user' ? styles.userMessage : styles.characterMessage),
              ...(message.sender === 'character' && { backgroundColor: `${character.color}33` })
            }}
          >
            {message.sender === 'character' && (
              <span style={styles.messageAvatar}>{character.avatar}</span>
            )}
            <p style={styles.messageText}>{message.text}</p>
          </div>
        ))}
        {isLoading && (
          <div style={{...styles.messageBubble, ...styles.characterMessage, backgroundColor: `${character.color}33`}}>
            <span style={styles.messageAvatar}>{character.avatar}</span>
            <div style={styles.typingIndicator}>
              <span style={styles.typingDot}>●</span>
              <span style={{...styles.typingDot, animationDelay: '0.2s'}}>●</span>
              <span style={{...styles.typingDot, animationDelay: '0.4s'}}>●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.quickRepliesContainer}>
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => { setInputText(reply); }}
            style={{
              ...styles.quickReplyButton,
              borderColor: character.color
            }}
          >
            {reply}
          </button>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.slice(0, 200))}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Say something to ${character.name}...`}
          style={styles.textInput}
          maxLength={200}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !inputText.trim()}
          style={{
            ...styles.sendButton,
            background: character.gradient,
            opacity: (isLoading || !inputText.trim()) ? 0.5 : 1
          }}
        >
          ✉️
        </button>
      </div>
    </div>
  );
};

// Settings Screen (Parent Area)
const SettingsScreen = ({ onBack, settings, onUpdateSettings }) => {
  return (
    <div style={styles.settingsContainer}>
      <div style={styles.settingsHeader}>
        <button onClick={onBack} style={styles.backButton}>←</button>
        <h1 style={styles.settingsTitle}>👨‍👩‍👧 Parent Settings</h1>
      </div>

      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>Child's Profile</h3>
        <label style={styles.settingLabel}>
          Child's Name
          <input
            type="text"
            value={settings.childName}
            onChange={(e) => onUpdateSettings({ ...settings, childName: e.target.value })}
            style={styles.settingInput}
            maxLength={20}
          />
        </label>
        <label style={styles.settingLabel}>
          Age
          <select 
            value={settings.childAge} 
            onChange={(e) => onUpdateSettings({ ...settings, childAge: e.target.value })}
            style={styles.settingSelect}
          >
            {[4,5,6,7,8,9,10].map(age => (
              <option key={age} value={age}>{age} years old</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>Safety Controls</h3>
        <label style={styles.toggleLabel}>
          <span>Daily time limit</span>
          <select 
            value={settings.timeLimit} 
            onChange={(e) => onUpdateSettings({ ...settings, timeLimit: e.target.value })}
            style={styles.settingSelect}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="0">No limit</option>
          </select>
        </label>
        <label style={styles.toggleLabel}>
          <span>Require parent approval for new chats</span>
          <input
            type="checkbox"
            checked={settings.requireApproval}
            onChange={(e) => onUpdateSettings({ ...settings, requireApproval: e.target.checked })}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>Subscription</h3>
        <div style={styles.subscriptionCard}>
          <p style={styles.subscriptionStatus}>
            {settings.subscribed ? '✅ Premium Active' : '🔒 Free Plan'}
          </p>
          {!settings.subscribed && (
            <button 
              onClick={() => onUpdateSettings({ ...settings, subscribed: true })}
              style={styles.subscribeButton}
            >
              Upgrade to Premium - $4.99/month
            </button>
          )}
          <ul style={styles.featureList}>
            <li>✓ Unlimited character chats</li>
            <li>✓ No advertisements</li>
            <li>✓ New characters added monthly</li>
            <li>✓ Chat history saved</li>
          </ul>
        </div>
      </div>

      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>Privacy & Data</h3>
        <p style={styles.privacyText}>
          🛡️ We take your child's privacy seriously. We comply with COPPA regulations 
          and never collect personal information without parental consent.
        </p>
        <button style={styles.linkButton}>View Privacy Policy</button>
        <button style={styles.linkButton}>Delete All Data</button>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [settings, setSettings] = useState({
    childName: '',
    childAge: '6',
    timeLimit: '30',
    requireApproval: false,
    subscribed: false
  });

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setScreen('chat');
  };

  const handleOpenSettings = () => {
    setPendingAction('settings');
    setShowParentalGate(true);
  };

  const handleParentalGateSuccess = () => {
    setShowParentalGate(false);
    if (pendingAction === 'settings') {
      setScreen('settings');
    }
    setPendingAction(null);
  };

  return (
    <div style={styles.appContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        input:focus, button:focus {
          outline: 3px solid #fbbf24;
          outline-offset: 2px;
        }
      `}</style>

      {showParentalGate && (
        <ParentalGate 
          onSuccess={handleParentalGateSuccess}
          onCancel={() => setShowParentalGate(false)}
        />
      )}

      {screen === 'home' && (
        <HomeScreen 
          onSelectCharacter={handleSelectCharacter}
          onOpenSettings={handleOpenSettings}
          childName={settings.childName}
        />
      )}

      {screen === 'chat' && selectedCharacter && (
        <ChatScreen 
          character={selectedCharacter}
          onBack={() => setScreen('home')}
          childName={settings.childName}
        />
      )}

      {screen === 'settings' && (
        <SettingsScreen 
          onBack={() => setScreen('home')}
          settings={settings}
          onUpdateSettings={setSettings}
        />
      )}
    </div>
  );
}

// Styles
const styles = {
  appContainer: {
    fontFamily: "'Nunito', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #e0e7ff 100%)',
  },
  
  // Home Screen
  homeContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  homeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoEmoji: {
    fontSize: '40px',
    animation: 'float 3s ease-in-out infinite',
  },
  appTitle: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #f472b6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  settingsButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    background: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px',
  },
  welcomeSubtext: {
    fontSize: '16px',
    color: '#6b7280',
  },
  characterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  characterCard: {
    padding: '20px',
    borderRadius: '24px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  characterAvatar: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '8px',
    animation: 'bounce 2s ease-in-out infinite',
  },
  characterName: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    marginBottom: '4px',
  },
  characterTagline: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  safetyBadge: {
    textAlign: 'center',
    padding: '12px',
    background: 'rgba(255,255,255,0.8)',
    borderRadius: '100px',
    fontSize: '14px',
    color: '#059669',
    fontWeight: '600',
  },

  // Chat Screen
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    gap: '16px',
  },
  backButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.3)',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
  },
  chatHeaderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  chatHeaderAvatar: {
    fontSize: '36px',
  },
  chatHeaderName: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  onlineStatus: {
    fontSize: '12px',
    color: '#86efac',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    color: 'white',
    borderBottomRightRadius: '4px',
  },
  characterMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '4px',
  },
  messageAvatar: {
    fontSize: '24px',
    flexShrink: 0,
  },
  messageText: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#1f2937',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
  },
  typingDot: {
    animation: 'pulse 1s ease-in-out infinite',
    color: '#6b7280',
  },
  quickRepliesContainer: {
    display: 'flex',
    gap: '8px',
    padding: '12px 20px',
    overflowX: 'auto',
    flexWrap: 'nowrap',
  },
  quickReplyButton: {
    padding: '8px 16px',
    borderRadius: '100px',
    border: '2px solid',
    background: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'transform 0.1s',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    padding: '16px 20px',
    background: 'white',
    borderTop: '1px solid #e5e7eb',
  },
  textInput: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '100px',
    border: '2px solid #e5e7eb',
    fontSize: '16px',
    fontFamily: 'inherit',
  },
  sendButton: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  },

  // Settings Screen
  settingsContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#f9fafb',
  },
  settingsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  settingsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
  },
  settingsSection: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '16px',
  },
  settingLabel: {
    display: 'block',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
  },
  settingInput: {
    display: 'block',
    width: '100%',
    marginTop: '8px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '16px',
    fontFamily: 'inherit',
  },
  settingSelect: {
    display: 'block',
    width: '100%',
    marginTop: '8px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '16px',
    fontFamily: 'inherit',
    background: 'white',
  },
  toggleLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '15px',
    color: '#374151',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  subscriptionCard: {
    textAlign: 'center',
  },
  subscriptionStatus: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  subscribeButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  featureList: {
    textAlign: 'left',
    listStyle: 'none',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '2',
  },
  privacyText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  linkButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    background: 'white',
    fontSize: '14px',
    color: '#6366f1',
    cursor: 'pointer',
    fontWeight: '600',
  },

  // Parental Gate
  parentalGateOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  parentalGateModal: {
    background: 'white',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '360px',
    width: '100%',
    textAlign: 'center',
  },
  parentalGateTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1f2937',
  },
  parentalGateText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '16px',
  },
  mathProblem: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#8b5cf6',
    marginBottom: '16px',
  },
  pinInput: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '24px',
    textAlign: 'center',
    fontFamily: 'inherit',
    marginBottom: '16px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '16px',
  },
  parentalGateButtons: {
    display: 'flex',
    gap: '12px',
  },
  cancelButton: {
    flex: 1,
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    background: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmButton: {
    flex: 1,
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
