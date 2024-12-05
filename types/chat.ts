export interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    pending : boolean;
  }
  
