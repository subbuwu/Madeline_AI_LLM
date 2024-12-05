import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HfInference } from "@huggingface/inference";
import { Message } from '@/types/chat';

const MODEL_ID = "Qwen/QwQ-32B-Preview";
const client = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

export const useChat = () => {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages'],
    initialData: [],
  });

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
        max_tokens: 300,
        temperature: 0.6,
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

  return {
    messages,
    sendMessage,
    isLoading: sendMessage.isPending,
  };
};