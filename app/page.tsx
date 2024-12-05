"use client"

import UserChat from '@/components/UserChat';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


export default function Home() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <UserChat/>
    </QueryClientProvider>
    </>
  );
}
