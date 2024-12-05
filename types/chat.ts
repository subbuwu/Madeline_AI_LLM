export interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    pending : boolean;
  }
  
  export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface ChatProps {
    initialMessages?: Message[];
  }
  
  export interface ChatCompletion {
    choices: {
      message: {
        content: string;
        role: string;
      };
    }[];
  }