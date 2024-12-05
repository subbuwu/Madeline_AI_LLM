"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HfInference } from "@huggingface/inference";
import { Message } from '@/types/chat';
import { useEffect, useState } from 'react';

const MODEL_ID = "Qwen/QwQ-32B-Preview";
const client = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

type ModelSettings = {
  creativity: number;
  responseLength: 'short' | 'medium' | 'long';
};

export const useChat = (initialSettings: ModelSettings = {
  creativity: 0.7,
  responseLength: 'medium'
}) => {
  const queryClient = useQueryClient();
  

  const [modelSettings, setModelSettings] = useState<ModelSettings>(() => {
    
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('chatModelSettings');
      return savedSettings 
      ? JSON.parse(savedSettings) 
      : initialSettings;
    }
    
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(modelSettings)
      localStorage.setItem('chatModelSettings', JSON.stringify(modelSettings));
    }
  }, [modelSettings]);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages'],
    initialData: [],
  });

  const getMaxTokens = (length: 'short' | 'medium' | 'long') => {
    switch (length) {
      case 'short': return 150;
      case 'medium': return 300;
      case 'long': return 500;
      default: return 300;
    }
  };

  const sendMessage = useMutation({
    mutationFn: async (newMessage: string) => {
      const userMessage: Message = {
        id: Date.now(),
        role: 'user',
        content: newMessage,
        pending: false,
      };

      queryClient.setQueryData<Message[]>(['messages'], (old = []) => [
        ...old,
        userMessage,
        { id: Date.now() + 1, role: 'assistant', content: '', pending: true }
      ]);

      const recentMessages = [...messages.slice(-4), userMessage];
      const formattedMessages = recentMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const chatCompletion = await client.chatCompletion({
        model: MODEL_ID,
        messages: formattedMessages,
        max_tokens: getMaxTokens(modelSettings.responseLength),
        temperature: modelSettings.creativity,
        top_p: 0.95,
      });

      const response = chatCompletion.choices[0].message.content;

      queryClient.setQueryData<Message[]>(['messages'], (old = []) => {
        const updated = [...old];
        updated[updated.length - 1] = {
          id: Date.now() + 1,
          role: 'assistant',
          content: response ?? '',
          pending: false,
        };
        return updated;
      });

      return response;
    },
  });

  const updateModelSettings = (newSettings: Partial<ModelSettings>) => {
    setModelSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return {
    messages,
    sendMessage,
    isLoading: sendMessage.isPending,
    modelSettings,
    updateModelSettings,
  };
};