"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Brain, User, Loader2, Settings, 
  MessageCircle, Sparkles, Sun, Moon, 
  Check, X, Info 
} from 'lucide-react';
import { useChat } from '@/hooks/useAIChat';
import { cn } from '@/lib/utils';

export const UserChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    modelSettings, 
    updateModelSettings 
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
      }
    };
    
    if (inputRef.current) {
      inputRef.current.addEventListener('input', adjustHeight);
      return () => {
        inputRef.current?.removeEventListener('input', adjustHeight);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setInput('');
    await sendMessage.mutateAsync(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSettingsSave = () => {
    setShowSettings(false);
  };

    return (
        <div className={cn(
          "flex flex-col h-screen",
          theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-white'
        )}>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "p-4 shadow-xl backdrop-blur-md border-b",
              theme === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-neutral-800 border-gray-700'
            )}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Brain className={cn("w-8 h-8", theme === 'light' ? 'text-blue-600' : 'text-white')} />
                <div>
                  <h1 className={cn(
                    "text-2xl font-bold",
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  )}>
                    Madeline AI
                  </h1>
                  <p className={cn(
                    "text-sm",
                    theme === 'light' ? 'text-gray-500' : 'text-gray-300'
                  )}>
                    Your Intelligent Chat Companion
                  </p>
                </div>
              </div>
    
              <div className="flex items-center space-x-4">
                <motion.button 
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-full hover:bg-gray-200 transition-colors",
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  )}
                >
                  {theme === 'light' ? <Moon /> : <Sun />}
                </motion.button>
    
                <motion.button 
                  onClick={() => setShowSettings(!showSettings)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-full hover:bg-gray-200 transition-colors",
                    theme === 'light' ? 'text-gray-700' : 'text-white'
                  )}
                >
                  <Settings />
                </motion.button>
              </div>
            </div>
          </motion.div>
    
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={cn(
                  "w-96 p-6 rounded-lg shadow-xl",
                  theme === 'light' ? 'bg-white' : 'bg-gray-800'
                )}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className={cn(
                    "text-xl font-semibold",
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  )}>
                    Model Settings
                  </h2>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className={cn(
                      "hover:bg-gray-200 rounded-full p-1",
                      theme === 'light' ? 'text-gray-700' : 'text-white'
                    )}
                  >
                    <X />
                  </button>
                </div>
    
                <div className="space-y-4">
              <div>
                <label className={cn(
                  "block mb-2 font-medium",
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                )}>
                  Creativity Level
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={modelSettings.creativity}
                  onChange={(e) => updateModelSettings({ 
                    creativity: parseFloat(e.target.value) 
                  })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Current: {(modelSettings.creativity * 100).toFixed(0)}%
                </div>
              </div>

              <div>
                <label className={cn(
                  "block mb-2 font-medium",
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                )}>
                  Response Length
                </label>
                <select 
                  value={modelSettings.responseLength}
                  onChange={(e) => updateModelSettings({ 
                    responseLength: e.target.value as 'short' | 'medium' | 'long' 
                  })}
                  className={cn(
                    "w-full p-2 rounded-md border",
                    theme === 'light' 
                      ? 'bg-white border-gray-300' 
                      : 'bg-gray-700 border-gray-600 text-white'
                  )}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>
    
                <div className="flex justify-end space-x-2 mt-4">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className={cn(
                      "px-4 py-2 rounded-md",
                      theme === 'light'
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    )}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className={cn(
                      "px-4 py-2 rounded-md",
                      theme === 'light'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    )}
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}


      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  "flex items-start space-x-2",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-4",
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white shadow-sm border border-gray-500'
                  )}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Brain className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  
                  {message.pending ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  ) : (
                    <div className={message.role === 'user' ? 'text-white' : 'text-gray-800'}>
                      {message.content}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>


      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-white border-t"
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserChat;